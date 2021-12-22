import { useState, createRef, useEffect } from "react";
import { Empty } from "antd";
import { Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import $ from "jquery";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import NProgress from "nprogress";
import "../../authPage/nprogress.css";
import SuiTypography from "../../SuiTypography";


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];

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

const DragDrop = () => {
  const fbRef = createRef();
  let formState = null;
  const addToast = useToasts();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    formState = $(fbRef.current).formBuilder(formData);
  }, []);

  const saveForm = async (event) => {
    event.preventDefault();
    NProgress.start();
    setIsSubmitting(true);
    const token = localStorage.getItem("auth-token");
    const formData = formState.actions.getData("json");
    console.log("formData: ", formData);
    const user = JSON.parse(localStorage.getItem("user"));
    let data = {
      userId: user.id,
      username: user.username,
      formName: `${user.username}'s Form`,
      formCategory: "Finance",
      description: "Acknowledgement Form",
      formData: formData,
    };
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}forms/create`, data, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Success");
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          NProgress.done();
        } else {
          console.log("Failed");
          addToast(res.data.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          NProgress.done();
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        addToast("Something Went Wrong!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        setIsSubmitting(false);
        NProgress.done();
        console.log("err", err);
      });
  };

  return (
    <>
      <style type="text/css">
        {`
          .form-actions {
            display: none !important;
          }
        `}
      </style>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SuiTypography variant="h6" fontWeight="medium">
        {dimensions.width > 1000 ? (
          <Card className="h-100">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0px 10px 0px",
              }}
            >
              <Button
                variant="dark"
                id="saveData"
                onClick={saveForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
            <div
              id="fb-editor"
              ref={fbRef}
              style={{ padding: "0px 20px 20px 20px" }}
            />
          </Card>
        ) : (
          <Card
            className="h-100"
            style={{ display: "flex", justifyContent: "center", height: '100%', padding: '20px' }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              imageStyle={{
                height: 60,
              }}
              description={<span>Use PC/Laptop To Create Form!</span>}
            ></Empty>
          </Card>
        )}
      </SuiTypography>
    </>
  );
};

export default DragDrop;
