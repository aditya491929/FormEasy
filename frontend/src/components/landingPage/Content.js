import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import classes from "./Content.module.css";
import { UserContext } from "../../context/UserContext";
import { useToasts } from 'react-toast-notifications';

const Content = () => {
  const { userData } = useContext(UserContext);
  const history = useNavigate();
  const { addToast } = useToasts();

  const onGetStartedClick = () => {
    if (userData.user) {
      history("/home");
    } else {
      addToast('Login/SignUp to Get Started!', { appearance: 'warning', autoDismiss: true, autoDismissTimeout: 2000 })
    }
  };
  return (
    <>
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
      </Container>
    </>
  );
};

export default Content;
