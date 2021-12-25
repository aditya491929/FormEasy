import { useState, createRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import $ from "jquery";
import "../../authPage/nprogress.css";
import extractResponses from "../responseExtractor";
import axios from 'axios';
import NProgress from "nprogress";
import "../../authPage/nprogress.css";
import { useToasts } from 'react-toast-notifications';

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

const FormRenderer = ( {formData, formId} ) => {
  const renderRef = createRef();
  const [formState, setFormState] = useState();
  const [isSubmitting, setIsSubmitting ] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const {addToast} = useToasts();

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


  const handleSubmit = async () => {
    try{
      setIsSubmitting(true);
      NProgress.start();
      const response = JSON.stringify(extractResponses(($(renderRef.current).formRender("userData"))))
      const user = JSON.parse(localStorage.getItem('user'))
      let data = {}
      if(user){
        data = {
          "userId": user.id,
          "data": response
        }
      }else{
        data = {
          "data": response
        }
      }
      console.log(formId);
      const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}forms/post/${formId}`, data);
      if(result.data.success){
        addToast(result.data.message, { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2000 })
        $(renderRef.current).formRender('clear');
      }else{
        addToast(result.data.message, { appearance: 'warning', autoDismiss: true, autoDismissTimeout: 2000 })
      }
      NProgress.done();
    } catch(err){
      console.log(err);
      NProgress.done();
      addToast(err, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2000 })
    } 
    setIsSubmitting(false);
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
          disabled={isSubmitting}
        >
          {!isSubmitting ? 'Submit' : 'Submitting'}
        </Button>
      </div>
    </div>
  );
};

export default FormRenderer;
