import { useState, createRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Card as CD, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Steps, Result, Empty, Button as Btn, Upload } from "antd";
import { CornerDialog } from "evergreen-ui";
import { UploadOutlined } from "@ant-design/icons";
import { FormOutlined, CheckOutlined } from "@ant-design/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import $ from "jquery";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import NProgress from "nprogress";
import "../../authPage/nprogress.css";
import SuiTypography from "../../SuiTypography";
import QRCode from "react-qr-code";
const { Step } = Steps;

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
  const { addToast } = useToasts();
  const formDescriptionRef = useRef();

  const [step, setStep] = useState("1");
  const [formState, setFormState] = useState();
  const [formName, setFormName] = useState();
  const [formCategory, setFormCategory] = useState();
  const [formVisibility, setFormVisibility] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [formid, setFormid] = useState("");
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
    console.log("1");
    let form = $(fbRef.current).formBuilder(formData);
    setFormState(form);
  }, []);

  const showModal = (formId) => {
    setFormid(formId);
    setModalVisibility(true);
  };

  const [file, setFile] = useState({
    fileList: [],
  });

  const handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    setFile({ fileList });
  };

  const saveForm = async (event) => {
    event.preventDefault();

    NProgress.start();
    setIsSubmitting(true);

    const token = localStorage.getItem("auth-token");
    const formData = formState.actions.getData("json");
    const user = JSON.parse(localStorage.getItem("user"));

    let data = new FormData();
    if (file.fileList.length > 0) {
      for (let i = 0; i < file.fileList.length; i++) {
        data.append("image", file.fileList[i].originFileObj);
      }
    }
    data.append("userId", user.id);
    data.append("username", user.username);
    data.append("formName", formName);
    data.append("formCategory", formCategory);
    data.append("description", formDescriptionRef.current.value);
    data.append("visibility", formVisibility);
    data.append("formData", formData);

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}forms/create`, data, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setFormCategory("");
        setFormName("");
        formDescriptionRef.current.value = "";
        setFile({ fileList: [] });
        if (res.data.success) {
          console.log("Success");
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          NProgress.done();
          setIsSuccess(true);
          setStep("3");
          showModal(res.data.id);
        } else {
          console.log("Failed");
          addToast(res.data.message, {
            appearance: "warning",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          NProgress.done();
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        NProgress.done();
        addToast("Something Went Wrong!", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
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
          .formbuilder-icon-button{
            display: none;
          }
        `}
      </style>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CornerDialog
        title="Form QR Code (Click to Preview Form)"
        isShown={modalVisibility}
        onCloseComplete={() => setModalVisibility(false)}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link to={`/form/${formid}`}>
          <QRCode value={`http://localhost:3000/form/${formid}`} />
        </Link>
      </CornerDialog>
      <SuiTypography variant="h6" fontWeight="medium">
        {dimensions.width > 1000 ? (
          <Card className="h-100">
            <div style={{ padding: "20px" }}>
              <Steps>
                <Step
                  status={step === "1" ? "process" : "finish"}
                  title="Step1"
                  description="Build Form"
                />
                <Step
                  status={
                    step === "2" ? "process" : step === "1" ? "wait" : "finish"
                  }
                  title="Step2"
                  description="Add Form Details"
                  icon={<FormOutlined />}
                />
                <Step
                  status={step === "3" ? "finish" : "wait"}
                  title="Done"
                  icon={<CheckOutlined />}
                />
              </Steps>
            </div>
            {step === "1" && (
              <>
                <div
                  id="fb-editor"
                  ref={fbRef}
                  style={{ padding: "0px 20px 20px 20px" }}
                />
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
                    onClick={() => {
                      setStep("2");
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === "2" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <CD style={{ width: "50%" }}>
                    <CD.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="customFormBasicName"
                        >
                          <Form.Label>Form Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Form Name"
                            value={formName}
                            onChange={(event) => {
                              setFormName(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="customFormBasicCategory"
                        >
                          <Form.Label>Form Category</Form.Label>
                          <Form.Select
                            value={formCategory}
                            onChange={(event) => {
                              setFormCategory(event.target.value);
                            }}
                          >
                            <option>Select Form Category</option>
                            <option value="Survey">Survey</option>
                            <option value="Banking">Banking</option>
                            <option value="Education">Education</option>
                            <option value="Job Application">
                              Job Application
                            </option>
                            <option value="Admission">Admission</option>
                            <option value="Membership">Membership</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Others">Others</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="customFormBasicDescription"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            ref={formDescriptionRef}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="uploadFormBasicFile"
                        >
                          <Form.Label>Upload File &nbsp;</Form.Label>
                          <Upload
                            multiple={true}
                            listType="picture"
                            fileList={file.fileList}
                            onChange={handleUpload}
                            beforeUpload={() => false}
                          >
                            <Btn icon={<UploadOutlined />}>Upload</Btn>
                          </Upload>
                        </Form.Group>
                        <FormControlLabel
                          style={{ padding: "0px 0px 5px 10px" }}
                          control={
                            <Switch
                              checked={formVisibility}
                              onChange={() => {
                                setFormVisibility(!formVisibility);
                              }}
                            />
                          }
                          label={
                            formVisibility
                              ? "Accepting Response!"
                              : "Not Accepting Response!"
                          }
                        />
                      </Form>
                      <Button
                        variant="dark"
                        onClick={saveForm}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting" : "Submit"}
                      </Button>
                    </CD.Body>
                  </CD>
                </div>
              </>
            )}
            {step === "3" && isSuccess && (
              <div>
                <Result
                  status="success"
                  title="Form Created Successfully!"
                  // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                  extra={[
                    <Button
                      variant="dark"
                      onClick={() => {
                        setStep("1");
                      }}
                    >
                      Create Another Form
                    </Button>,
                  ]}
                />
              </div>
            )}
          </Card>
        ) : (
          <Card
            className="h-100"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              padding: "20px",
            }}
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
