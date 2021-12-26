import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { Layout, Breadcrumb } from "antd";
import { CalendarOutlined, IdcardOutlined, MailOutlined } from "@ant-design/icons";
import { Avatar, Pill } from "evergreen-ui";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import MainHeader from "../navbar/MainHeader";
import "./index.css";
const { Content, Footer } = Layout;

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

const PublicProfile = () => {
  const [isLoading, setIsloading] = useState(true);
  const [userData, setUserData] = useState({});
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const history = useNavigate();

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
    let userId = window.location.href.split("/").pop();
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}forms/by/${userId}`
      );
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        console.log("Something Went Wrong!");
      }
      setIsloading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <style type="text/css">
        {`
          .ant-layout{
            min-height: 90vh;
          }
          .ant-breadcrumb-link:hover {
            cursor: pointer;
            color: black;
          }
          .site-layout-content{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <MainHeader />
      <Layout className="layout">
        <Content
          style={
            dimensions.width < 600
              ? { padding: "0 10px" }
              : { padding: "0 30px" }
          }
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
            <Breadcrumb.Item>UserName</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col sm={12} md={5} lg={4}>
              <div
                className="site-layout-content"
                style={
                  dimensions.width < 768
                    ? { marginBottom: "20px" }
                    : { marginBottom: "0px" }
                }
              >
                <h3>Profile</h3>
                {isLoading && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress style={{ color: "#03ef62" }} />
                  </div>
                )}
                {!isLoading && (
                  <>
                    <Avatar
                      name={`${userData.fname} ${userData.lname}`}
                      size={100}
                      color="green"
                      style={{ marginBottom: "10px" }}
                    />
                    <Pill
                      display="inline-flex"
                      color="yellow"
                      margin={8}
                      style={{ marginBottom: "30px" }}
                    >
                      {userData.forms.length} {"forms"}
                    </Pill>

                    <Form>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control
                              type="text"
                              value={userData.fname}
                              disabled={true}
                            />
                          </Col>
                          <Col>
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                              type="text"
                              value={userData.lname}
                              disabled={true}
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="registerFormBasicUsername"
                      >
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={userData.username}
                          disabled={true}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="registerFormBasicEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={userData.email}
                          disabled={true}
                        />
                      </Form.Group>
                    </Form>
                    <a href={`mailto:${userData.email}`} target="_blank"><Button variant="dark" size="sm"><MailOutlined style={{verticalAlign: 'middle'}}/> {" Any Form Grievance?"}</Button></a>
                  </>
                )}
              </div>
            </Col>
            <Col sm={12} md={7} lg={8}>
              <div className="site-layout-content">
                <h3>Forms</h3>
                {isLoading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress style={{ color: "#03ef62" }} />
                  </div>
                ) : (
                  <Grow
                    in={!isLoading}
                    style={{ transformOrigin: "50 50 50 50" }}
                    {...(!isLoading ? { timeout: 1000 } : {})}
                  >
                    <Row
                      className="g-4"
                      style={{ display: "flex", justifyContent: "center", width: '100%' }}
                    >
                      {userData.forms.map((form) => {
                        return (
                          <Col
                            xs={12}
                            sm={6}
                            lg={6}
                            xl={4}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            key={form.id}
                          >
                            <Card style={{ width: "18rem" }}>
                              <Card.Body>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Card.Title>{form.formname}</Card.Title>
                                  <Card.Subtitle
                                    className="mb-2 text-muted"
                                    style={{ fontSize: "0.8em" }}
                                  >
                                    <Pill
                                      display="inline-flex"
                                      margin={0}
                                      color="green"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CalendarOutlined
                                        style={{ marginRight: "3px" }}
                                      />{" "}
                                      {`${form.date.slice(0, 10)}`}
                                    </Pill>
                                  </Card.Subtitle>
                                </div>

                                <Card.Subtitle
                                  className="mb-2 text-muted"
                                  style={{ fontSize: "0.8em" }}
                                >
                                  <Pill
                                    display="inline-flex"
                                    margin={0}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "fit-content",
                                    }}
                                    color="yellow"
                                  >
                                    <IdcardOutlined
                                      style={{ marginRight: "3px" }}
                                    />{" "}
                                    {form.id}
                                  </Pill>
                                </Card.Subtitle>
                                <Button
                                  variant={"dark"}
                                  onClick={() => {
                                    history(`/form/${form.id}`);
                                  }}
                                  size="sm"
                                >
                                  Fill Form
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Grow>
                )}
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </>
  );
};

export default PublicProfile;
