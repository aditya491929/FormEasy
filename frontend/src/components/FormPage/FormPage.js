import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Empty } from "antd";
import { Tabs, Tab, Button, ButtonGroup } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { ChevronRightOutlined, ChevronLeftOutlined } from "@mui/icons-material";
import FormRender from "./components/formRenderer";
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
const url =
  "https://cors-anywhere.herokuapp.com/https://res.cloudinary.com/formeasy/image/upload/v1639907305/formEz/zq1ddlv2qppyso1optwx.pdf";

const FormPage = () => {
  const [tabId, setTabId] = useState("1");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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

  // useEffect(() => {
  //   const originalFormData = [
  //     {
  //       type: "text",
  //       label: "Text Field",
  //       className: "form-control",
  //       name: "text-1478701075825",
  //       userData: ["user entered data"]
  //     },
  //     {
  //       type: "checkbox-group",
  //       label: "Checkbox Group",
  //       className: "checkbox-group",
  //       name: "checkbox-group-1478704652409",
  //       values: [
  //         {
  //           label: "Option 1",
  //           value: "option-1",
  //           selected: true
  //         },
  //         {
  //           label: "Option 2",
  //           value: "option-2"
  //         },
  //         {
  //           label: "Option 3",
  //           value: "option-3",
  //           selected: true
  //         }
  //       ]
  //     },
  //     {
  //       type: "select",
  //       label: "Select",
  //       className: "form-control",
  //       name: "select-1478701076382",
  //       values: [
  //         {
  //           label: "Option 1",
  //           value: "option-1",
  //           selected: true
  //         },
  //         {
  //           label: "Option 2",
  //           value: "option-2"
  //         },
  //         {
  //           label: "Option 3",
  //           value: "option-3"
  //         }
  //       ]
  //     },
  //     {
  //       type: "textarea",
  //       label: "Text Area",
  //       className: "form-control",
  //       name: "textarea-1478701077511"
  //     }
  //   ];
  //   const formData = JSON.stringify(originalFormData);
  //   console.log("1");
  //   let form = $(fbRef.current).formRender({formData: formData});
  //   setFormState(form);
  // }, []);


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

  // function submitForm() {
  //   alert(formState.formRender("userData"));
  // }

  const originalFormData = [
    {
      type: "text",
      label: "Text Field",
      className: "form-control",
      name: "text-1478701075825",
      userData: ["user entered data"]
    },
    {
      type: "checkbox-group",
      label: "Checkbox Group",
      className: "checkbox-group",
      name: "checkbox-group-1478704652409",
      values: [
        {
          label: "Option 1",
          value: "option-1",
          selected: true
        },
        {
          label: "Option 2",
          value: "option-2"
        },
        {
          label: "Option 3",
          value: "option-3",
          selected: true
        }
      ]
    },
    {
      type: "select",
      label: "Select",
      className: "form-control",
      name: "select-1478701076382",
      values: [
        {
          label: "Option 1",
          value: "option-1",
          selected: true
        },
        {
          label: "Option 2",
          value: "option-2"
        },
        {
          label: "Option 3",
          value: "option-3"
        }
      ]
    },
    {
      type: "textarea",
      label: "Text Area",
      className: "form-control",
      name: "textarea-1478701077511"
    }
  ];
  const formData = JSON.stringify(originalFormData);

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
              margin-bottom: 20px;
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
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>formName</Breadcrumb.Item>
            {tabId === "1" && <Breadcrumb.Item>Form</Breadcrumb.Item>}
            {tabId === "2" && <Breadcrumb.Item>Form Reference</Breadcrumb.Item>}
            {tabId === "3" && (
              <Breadcrumb.Item>Form Description</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="site-layout-content">
            <Tabs
              defaultActiveKey="1"
              className="mb-3"
              onSelect={(eventKey, _) => {
                setTabId(eventKey);
              }}
            >
              <Tab eventKey="1" title="Form">
                {/* <h1>Form</h1> */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px 0px 20px 0px",
                  }}
                >
                  <FormRender formData={formData}/>
                </div>
                {/* <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Form Not Available!</span>}
                ></Empty> */}
              </Tab>
              <Tab eventKey="2" title="Reference">
                {/* <h1>Reference</h1> */}
                {/* <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Reference Not Available!</span>}
                ></Empty> */}
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ButtonGroup aria-label="Basic example">
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
                  <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                  </Document>
                </div>
              </Tab>
              <Tab eventKey="3" title="Description">
                {/* <h1>Description</h1> */}
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Description Not Available!</span>}
                ></Empty>
              </Tab>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default FormPage;
