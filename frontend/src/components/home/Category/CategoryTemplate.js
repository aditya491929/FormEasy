import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Empty, Divider, Tooltip } from "antd";
import { CalendarOutlined, IdcardOutlined } from "@ant-design/icons";
import { Pill, EyeOffIcon, EyeOpenIcon, CrossIcon } from "evergreen-ui";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const CategoryTemplate = (props) => {
  const { userData } = useContext(UserContext);
  const [banner, setBanner] = useState([]);
  const [categoryForms, setCategoryForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("auth-token");
    async function fetchData() {
      const result = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}form/categories/${props.categoryName}`);
      if (result.data.success) {
        setBanner(result.data.card);
        setCategoryForms(result.data.data);
      } else {
        console.log(result.data.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <style type="text/css">
        {`
          .card-text{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
                    line-clamp: 2; 
            -webkit-box-orient: vertical;
          }
        `}
      </style>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 330,
              height: 135,
            },
          }}
        >
          {banner.length > 0 ? (
            banner.map((category) => {
              return (
                <Grow in={true} key={category["_id"]}>
                  <Paper
                    elevation={5}
                    style={{ backgroundImage: `url(${category["url"]})` }}
                    {...{ timeout: 0.4 }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h3 style={{ color: "white" }}>{category["name"]}</h3>
                    </div>
                  </Paper>
                </Grow>
              );
            })
          ) : (
            <CircularProgress style={{ color: "#03ef62" }} />
          )}
        </Box>
      </div>
      <Divider>Forms</Divider>
      {categoryForms.length < 1 ? ( isLoading ?
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress style={{ color: "#03ef62" }} />
      </div>
      :
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={<span>{props.categoryName} Forms Not Available!</span>}
        />
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
            {categoryForms.map((form) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ display: "flex", justifyContent: "center" }}
                  key={form._id}
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
                        <Card.Title>
                          <Tooltip placement="top" title={`~ ${form.username}`}>
                            {form.formname}
                          </Tooltip>
                        </Card.Title>
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
                            {form._id}
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
                      <Card.Text>{form.description}</Card.Text>
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
                            history(`/form/${form._id}`);
                          }}
                          size="sm"
                        >
                          Fill Form
                        </Button>
                        <Button
                          variant={"outline-dark"}
                          onClick={() => {
                            history(`/profile/${form.userId}`);
                          }}
                          size="sm"
                        >
                          Other Forms
                        </Button>
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

export default CategoryTemplate;
