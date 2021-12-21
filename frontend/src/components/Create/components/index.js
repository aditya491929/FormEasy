import { useState, useRef, Component, createRef } from "react";
import axios from "axios";
import $ from 'jquery';
import { useToasts } from "react-toast-notifications";
import NProgress from "nprogress";
import "../../authPage/nprogress.css";
import { objectOf } from "prop-types";


window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const formData = []

class DragDrop extends Component {
  fb = createRef();
  formState = null;
  // addToast = useToasts();

  componentDidMount() {
    this.formState = $(this.fb.current).formBuilder(formData);

    // const script = document.createElement("script");
    // script.async = true;
    // script.src = "/formControl.js";
    // document.body.appendChild(script);
    // console.log("added");  
  }

  saveForm = async() => {
    try{
      const data = this.formState.actions.getData('json', true);

    } catch(error) {
       console.error(error);
    }
  }

  saveForm = async(event) => {
    event.preventDefault();
    // NProgress.start();
    // setIsSubmitting(true);
    const token = localStorage.getItem("auth-token");
    const formData = this.formState.actions.getData("json");
    console.log("formData: ",formData);
    const user = JSON.parse(localStorage.getItem("user"));
    // let formData = new FormData();
    // formData.append("userId", user.id);
    // formData.append("username", user.username);
    // formData.append("formName", formName);
    // formData.append("formCategory", formCategory);
    // formData.append("description", formDescriptionRef.current.value);
    // formData.append("data")
    let data = {
      userId : user.id,
      username: user.username,
      formName: `${user.username}'s Form`,
      formCategory: "Finance",
      description: "Acknowledgement Form",
      formData: formData
    }
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}forms/create`, data, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Success");
          // this.addToast(res.data.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          //   autoDismissTimeout: 2000,
          // });
          NProgress.done();
        } else {
          console.log("Failed");
          // this.addToast(res.data.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          //   autoDismissTimeout: 2000,
          // });
          NProgress.done();
        }
        // setIsSubmitting(false);
      })
      .catch((err) => {
        // this.addToast("Something Went Wrong!", {
        //   appearance: "error",
        //   autoDismiss: true,
        //   autoDismissTimeout: 2000,
        // });
        // this.setIsSubmitting(false);
        NProgress.done();
        console.log("err", err);
      });
  };

  // saveForm = async() => {
  //   console.log("here");
  //   // console.log($(this.fb.current).formBuilder().actions.getData());
  //   var fbEditor = document.getElementById('fb-editor');
  //   var formBuilder = $(fbEditor).formBuilder();
  //   alert(formBuilder.actions.getData('json', true));
  // }

  render(){
    return (
      <>
        <button id="saveData" onClick={this.saveForm}>Save changes</button>
        <div id="fb-editor" ref={this.fb} style={{"padding":"0px 20px 200px 20px"}}/>
      </>
    )
  }
}

export default DragDrop;
