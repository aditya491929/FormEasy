import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Breadcrumb, Empty } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tabs, Tab, Button, ButtonGroup } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { ChevronRightOutlined, ChevronLeftOutlined } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import FormRender from "./components/formRenderer";
import axios from "axios";
const { Content } = Layout;

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

const FormPage = () => {
  const [tabId, setTabId] = useState("1");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [url, setUrl] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const history = useNavigate();

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

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

  useEffect(async () => {
    let formId = window.location.href.split("/").pop();
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}forms/get/${formId}`
    );
    if (response.data.success) {
      if (response.data.data.formData.length) {
        const fdata = JSON.stringify(JSON.parse(response.data.data.formData));
        console.log(fdata);
        setFormData(fdata);
      }
      if (response.data.data.reference.length) {
        console.log(response.data.data.reference[0].url);
        setUrl(
          `https://cors-anywhere.herokuapp.com/${response.data.data.reference[0].url}`
        );
      }
      setFormDetails(response.data.data);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("auth-token");
      const isFavResponse = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}forms/isfavourite`,
        {
          headers: {
            "x-auth-token": token,
          },
          params: {
            userId: user.id,
            formId: formId,
          },
        }
      );
      if (isFavResponse.data.success) {
        setIsFavourite(isFavResponse.data.data);
      } else {
        console.log("Something Went Wrong!");
      }
      setLoading(false);
    } else {
      alert(response.data.message);
      setLoading(false);
    }
  }, [isFavourite]);

  const onClickHandler = async () => {
    setUpdating(true);
    let formId = window.location.href.split("/").pop();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("auth-token");
    const data = {
      formId: formId,
      userId: user.id,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}forms/favourites`,
        data,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.data.success) {
        setIsFavourite(response.data.data);
      } else {
        console.log("Something Went Wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setUpdating(false);
  };

  return (
    <>
      <style type="text/css">
        {`
          .nav-link {
            color: #13d461;
          }
          .nav-link:hover {
            color: #13d461;
          }
          .ant-layout{
              display: flex;
              flex-direction: row;
              justify-content: center;
              min-height: 100vh;
          }
          .site-layout-content{
              margin-bottom: 5px;
          }
          .react-pdf__Page{
            position: relative;
            max-height: 100vh;
            max-width: 100%;
            overflow: scroll;
          }
          .react-pdf__Page__canvas{
            display: block;
            user-select: none;
            width: 100% !important;
            height: 100% !important;
          }
          .ant-breadcrumb-link:hover {
            cursor: pointer;
            color: black;
          }
        `}
      </style>
      <Layout className="layout">
        <Content
          style={
            dimensions.width < 500
              ? { padding: "0 10px" }
              : { padding: "0 50px", maxWidth: "750px" }
          }
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item
                onClick={() => {
                  history("/home");
                }}
              >
                FormEasy
              </Breadcrumb.Item>
              <Breadcrumb.Item>{formDetails.formname}</Breadcrumb.Item>
              {tabId === "1" && <Breadcrumb.Item>Form</Breadcrumb.Item>}
              {tabId === "2" && (
                <Breadcrumb.Item>Form Reference</Breadcrumb.Item>
              )}
              {tabId === "3" && (
                <Breadcrumb.Item>Form Description</Breadcrumb.Item>
              )}
            </Breadcrumb>
            <Button
              size="sm"
              style={{ alignSelf: "center" }}
              variant="dark"
              onClick={() => {
                onClickHandler();
              }}
              disabled={updating}
            >
              {isFavourite ? 
              (
                <>
                <HeartOutlined style={{verticalAlign: 'middle'}}/>
                {" Remove From Favourite"} 
                </>
              )
              : (
              <>
              <HeartFilled style={{verticalAlign: 'middle'}}/>
              {" Add to favourite"}
              </>
              )}
            </Button>
          </div>
          {loading && (
            <div
              className="site-layout-content"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress style={{ color: "#03ef62" }} />
              </div>
            </div>
          )}
          {!loading && (
            <div className="site-layout-content">
              <Tabs
                defaultActiveKey="1"
                className="mb-3"
                onSelect={(eventKey, _) => {
                  setTabId(eventKey);
                }}
              >
                <Tab eventKey="1" title="Form">
                  {formData === "" ? (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      imageStyle={{
                        height: 100,
                      }}
                      description={<span>Form Not Available!</span>}
                    ></Empty>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {!formDetails.isAccepting ? (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_DEFAULT}
                          imageStyle={{
                            height: 100,
                          }}
                          description={
                            <span>Form Not Accepting Response!</span>
                          }
                        ></Empty>
                      ) : (
                        <FormRender
                          formData={formData}
                          formId={formDetails._id}
                        />
                      )}
                    </div>
                  )}
                </Tab>
                <Tab eventKey="2" title="Reference">
                  {url === "" && (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      imageStyle={{
                        height: 100,
                      }}
                      description={<span>Reference Not Available!</span>}
                    ></Empty>
                  )}
                  {url !== "" && (
                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ButtonGroup
                          aria-label="Basic example"
                          style={{ marginBottom: "5px" }}
                        >
                          <Button
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                            variant="dark"
                          >
                            <ChevronLeftOutlined />
                          </Button>
                          <Button variant="dark">
                            {" "}
                            Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                            {numPages || "--"}
                          </Button>
                          <Button
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                            variant="dark"
                          >
                            <ChevronRightOutlined />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="3" title="Description">
                  {formDetails.description === "" ? (
                    <div>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        imageStyle={{
                          height: 100,
                        }}
                        description={<span>Description Not Available!</span>}
                      ></Empty>
                    </div>
                  ) : (
                    <div>{formDetails.description}</div>
                  )}
                </Tab>
              </Tabs>
            </div>
          )}
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            Powered By <span style={{ fontWeight: "bold" }}>Form</span>
            <span style={{ fontWeight: "bold", color: "#03ef62" }}>Easy</span>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default FormPage;
