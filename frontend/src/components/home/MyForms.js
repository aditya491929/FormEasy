import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Empty, Tooltip } from "antd";
import { CalendarOutlined, IdcardOutlined } from "@ant-design/icons";
import { Pill, EyeOffIcon, EyeOpenIcon, CrossIcon } from "evergreen-ui";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";

const MyForms = () => {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("auth-token");
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}forms/myforms`,
          {
            params: {
              userId: user.id,
            },
            headers: { "x-auth-token": token },
          }
        );
        if (response.data.success) {
          if (response.data.data) {
            setData(response.data.data);
          }
        } else {
          console.log("Something went wwrong");
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '5px'}}>
      <h1 style={{verticalAlign: 'center'}}>MyForms</h1>
      {data.length > 1 && <Button variant="outline-dark"  onClick={() => history('/dashboard/create')}>Create Form</Button>}
    </div>
      {data.length < 1 ? (
        !isLoading ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            description={<span>No Forms Found!</span>}
          >
            <Button variant="dark" onClick={() => history("/dashboard/create")}>
              Create Form
            </Button>
          </Empty>
        ) : (
          <div style={{display: 'flex', justifyContent:'center'}}> 
            <CircularProgress style={{ color: "#03ef62" }} />
          </div>
        )
      ) : (
        <Grow
          in={!isLoading}
          style={{ transformOrigin: "50 50 50 50" }}
          {...(!isLoading ? { timeout: 1000 } : {})}
        >
          <Row
            className="g-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {data.map((form) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ display: "flex", justifyContent: "center" }}
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
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CalendarOutlined style={{ marginRight: "3px" }} />{" "}
                            {`${form.date.slice(0, 10)}`}
                          </Pill>
                        </Card.Subtitle>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "3px",
                        }}
                      >
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
                          >
                            <IdcardOutlined style={{ marginRight: "3px" }} />{" "}
                            {form.id}
                          </Pill>
                        </Card.Subtitle>
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
                            color="red"
                          >
                            {form.isAccepting === true ? (
                              <Tooltip placement="top" title={'Form Accepting Response!'}>
                                <EyeOpenIcon />
                              </Tooltip>
                            ) : form.isAccepting === false ? (
                              <Tooltip placement="top" title={'Form Not Accepting Response!'}>
                                <EyeOffIcon />
                              </Tooltip>
                            ) : (
                              <Tooltip placement="top" title={'No Form Available!'}>
                                <CrossIcon />
                              </Tooltip>
                            )}
                          </Pill>
                        </Card.Subtitle>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant={"dark"}
                          onClick={() => {
                            history(`/form/${form.id}`);
                          }}
                          size="sm"
                        >
                          Preview Form
                        </Button>
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
                          {form.responseCount} responses
                        </Pill>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Grow>
      )}
    </>
  );
};

export default MyForms;
