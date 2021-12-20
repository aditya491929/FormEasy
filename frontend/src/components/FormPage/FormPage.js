import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Empty } from "antd";
import { Tabs, Tab } from "react-bootstrap";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import file from './FeeReceipt.pdf';
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
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
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
                <h1>Form</h1>
                <Empty
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Form Not Available!</span>}
                ></Empty>
              </Tab>
              <Tab eventKey="2" title="Reference">
                <h1>Reference</h1>
                <div>
                  <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default FormPage;
