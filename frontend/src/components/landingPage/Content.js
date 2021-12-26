import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import classes from "./Content.module.css";
import { UserContext } from "../../context/UserContext";
import { useToasts } from "react-toast-notifications";
import Lottie from "react-lottie-player";
import lottieJson from "../../assets/landingPageAsset.json";
import lottieJson2 from "../../assets/landingPageAsset2.json";
import lottieJson3 from "../../assets/landingPageAsset3.json";
import { Tabs, Divider } from "antd";
import { Avatar } from "evergreen-ui";
import SimpleReactFooter from "simple-react-footer";
const { TabPane } = Tabs;

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

const Content = () => {
  const { userData } = useContext(UserContext);
  const [activeTabKey, setActiveTabkey] = useState("1");
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const history = useNavigate();
  const { addToast } = useToasts();

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

  const onGetStartedClick = () => {
    if (userData.user) {
      history("/home");
    } else {
      addToast("Login/SignUp to Get Started!", {
        appearance: "warning",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  const description =
    "FormEasy is a OneStop Solution to Creating, Managing and Collecting Form Response. Integrate Forms with super ease and let us handle assoicated overhead!";
  const title = "About";
  const columns = [
    {
      title: "Members",
      resources: [
        {
          name: "Aayush Malde (1911090)",
          link: "/https://github.com/aditya491929/FormEasy",
        },
        {
          name: "Aditya Malwade (1911091)",
          link: "https://github.com/aditya491929/FormEasy",
        },
        {
          name: "Rahul Panchal (1911097)",
          link: "https://github.com/aditya491929/FormEasy",
        },
      ],
    },
  ];
  return (
    <>
      <style type="text/css">
        {`
          .ant-tabs-ink-bar {
            background-color: #03ef62;
          }
          .ant-tabs-ink-bar-animated {
            background-color: #03ef62;
          }
          .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn, .ant-tabs-tab:hover  {
            color: #03ef62;
          }
        `}
      </style>
      <Container style={{ paddingTop: "2.5em" }}>
        <Row>
          <Col lg={true} style={{ paddingTop: "0.7em" }}>
            <div className={classes["bannerTitle"]}>
              There's a better
              <br />
              way to ask.
            </div>
            <p className={classes["bannerDescp"]}>
              We’re more than a Form. Or a DB. Customize Form to work the way
              you do. Create an{" "}
              <span style={{ color: "#13d461", fontWeight: "bold" }}>
                FormEasy
              </span>{" "}
              instead and make everyone happy.
            </p>
            <Button onClick={onGetStartedClick} size="lg" variant="dark">
              Get started
            </Button>
          </Col>
          <Col
            lg={true}
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <iframe
              className={classes["bannerImg"]}
              src="https://embed.lottiefiles.com/animation/8984"
              title="bannerImg"
            />
          </Col>
        </Row>
        <Divider style={{ fontSize: "2em", fontWeight: "bold" }}>
          Features
        </Divider>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "120px" }}>
          <Tabs
            onChange={(activeKey) => {
              setActiveTabkey(activeKey);
            }}
            tabPosition={dimensions.width < 500 ? "top" : "left"}
          >
            <TabPane tab={<Avatar name="1" color="green" size={40} />} key="1">
              <div
                style={{
                  width: dimensions.width < 500 ? dimensions.width : "600px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{
                    width: 280,
                    height: 280,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <h4 style={{ textAlign: "center", marginTop: "-30px" }}>
                  Build &#38; Manage Forms
                </h4>
              </div>
            </TabPane>
            <TabPane tab={<Avatar name="2" color="green" size={40} />} key="2">
              <div
                style={{
                  width: dimensions.width < 500 ? dimensions.width : "600px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Lottie
                  loop
                  animationData={lottieJson2}
                  play
                  style={{
                    width: 250,
                    height: 250,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <h4 style={{ textAlign: "center", marginTop: "0px" }}>
                  Upload Form Reference
                </h4>
              </div>
            </TabPane>
            <TabPane tab={<Avatar name="3" color="green" size={40} />} key="3">
              <div
                style={{
                  width: dimensions.width < 500 ? dimensions.width : "600px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Lottie
                  loop
                  animationData={lottieJson3}
                  play
                  style={{
                    width: 300,
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <h4 style={{ textAlign: "center", marginTop: "-50px" }}>
                  Collect &#38; Download Responses
                </h4>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Container>
      <SimpleReactFooter
        description={description}
        title={title}
        columns={columns}
        iconColor="black"
        backgroundColor="#212529"
        fontColor="white"
      />
    </>
  );
};

export default Content;
