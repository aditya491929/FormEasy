import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import classes from "./Content.module.css";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  const { userData } = useContext(UserContext);
  const history = useNavigate();
  const onGetStartedClick = () => {
    if (userData.user) {
      history("/home");
    } 
    else {
      toast("⚠️ Login/SignUp to Get Started!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        progressStyle: {'background':'#03ef62'},
      });
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            <Button onClick={onGetStartedClick} size="lg" variant="dark" style={{"zIndex" : "100"}}>
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
      </Container>
    </>
  );
};

export default Content;
