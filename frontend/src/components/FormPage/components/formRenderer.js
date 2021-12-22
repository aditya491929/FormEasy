import { useState, createRef, useEffect, useRef } from "react";
import { Form, Card as CD, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Steps, Result, Empty, Button as Btn, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  FormOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import axios from "axios";
import $ from "jquery";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import NProgress from "nprogress";
import "../../authPage/nprogress.css";
import SuiTypography from "../../SuiTypography";
const { Step } = Steps;

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require('formBuilder/dist/form-render.min.js')


function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const FormRenderer = ({ formData }) => {
  const renderRef = createRef();
  const { addToast } = useToasts();
  const [formState, setFormState] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    const form = $(renderRef.current).formRender({ formData: formData });
    setFormState(form);
  }, []);


  const handleSubmit = () => {
    alert(window.JSON.stringify($(renderRef.current).formRender("userData")));
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "75%",
        margin: "0px 0px 20px 0px",
      }}
    >
      <form id="fb-render" ref={renderRef}></form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0px 0px 20px 0px",
        }}
      >
        <Button
          variant="dark"
          id="saveData"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormRenderer;
