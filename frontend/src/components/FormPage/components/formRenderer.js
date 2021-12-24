import { useState, createRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import $ from "jquery";
import "../../authPage/nprogress.css";
import extractResponses from "../responseExtractor";

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

const FormRenderer = ( {formData} ) => {
  const renderRef = createRef();
  const [formState, setFormState] = useState();
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
    console.log(formData)
  }, []);


  const handleSubmit = () => {
    const response = window.JSON.stringify(extractResponses(($(renderRef.current).formRender("userData")))) 
    alert(response);
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: (dimensions.width < 550 ? "85%" : dimensions.width < 500 ? "95%" : "75%"),
        margin: "0px 0px 20px 0px",
      }}
    >
      <form id="fb-render" ref={renderRef}></form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
