import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SuiBox from "../../../SuiBox";
import SuiTypography from "../../../SuiTypography";
import { Upload, Button as Btn } from "antd";
import {CornerDialog} from 'evergreen-ui';
import { UploadOutlined } from "@ant-design/icons";
import NProgress from "nprogress";
import "../../../authPage/nprogress.css";
import { useToasts } from "react-toast-notifications";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import QRCode from "react-qr-code";

function Uform() {
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [formid, setFormid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formDescriptionRef = useRef();
  const { addToast } = useToasts();

  const nameChangeHandler = (e) => {
    setFormName(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setFormCategory(e.target.value);
  };

  const showModal = (formId) => {
    setFormid(formId);
    setModalVisibility(true);
  };

  const [file, setFile] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });

  const handleUpload = ({ fileList }) => {
    console.log("fileList", fileList);
    setFile({ fileList });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    NProgress.start();
    setIsSubmitting(true);
    const token = localStorage.getItem("auth-token");
    const user = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    for (let i = 0; i < file.fileList.length; i++) {
      formData.append("image", file.fileList[i].originFileObj);
    }
    formData.append("userId", user.id);
    formData.append("username", user.username);
    formData.append("formName", formName);
    formData.append("formCategory", formCategory);
    formData.append("description", formDescriptionRef.current.value);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}forms/upload`, formData, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setFormCategory("");
        setFormName("");
        formDescriptionRef.current.value = "";
        setFile({ previewVisible: false, previewImage: "", fileList: [] });
        if (res.data.success) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          NProgress.done();
          showModal(res.data.id);
        } else {
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
      <Card className="h-100">
        <SuiBox pt={3} px={3}>
          <SuiTypography variant="h6" fontWeight="medium">
            Reference Form Upload
          </SuiTypography>
          <SuiBox mt={0} mb={2}>
            <SuiTypography variant="button" color="text" fontWeight="regular">
              <SuiTypography
                display="inline"
                variant="body2"
                verticalAlign="middle"
              >
                <Icon
                  sx={{
                    fontWeight: "bold",
                    color: ({ palette: { success } }) => success.main,
                  }}
                >
                  arrow_downward
                </Icon>
              </SuiTypography>
              &nbsp; time required to fill tedious jargon filled forms by
              providing reference forms!
            </SuiTypography>
          </SuiBox>
        </SuiBox>
        <SuiBox p={2}>
          <SuiTypography variant="h6" fontWeight="medium">
            <Form>
              <Form.Group className="mb-3">
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Label>Form Name</Form.Label>
                    <Form.Control
                      value={formName}
                      type="text"
                      placeholder="Form name"
                      onChange={nameChangeHandler}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label>Form Category</Form.Label>
                    <Form.Select
                      value={formCategory}
                      onChange={categoryChangeHandler}
                    >
                      <option>Select Form Category</option>
                      <option value="Survey">Survey</option>
                      <option value="Banking">Banking</option>
                      <option value="Education">Education</option>
                      <option value="Job Application">Job Application</option>
                      <option value="Admission">Admission</option>
                      <option value="Membership">Membership</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="uploadFormBasicDescription"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  ref={formDescriptionRef}
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="uploadFormBasicFile">
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
              <Form.Group className="mb-3" controlId="uploadFormBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button
                variant="dark"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Form>
          </SuiTypography>
        </SuiBox>
      </Card>
    </>
  );
}

export default Uform;
