import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Input, Drawer, Empty, Tooltip } from "antd";
import { CalendarOutlined, IdcardOutlined } from "@ant-design/icons";
import { Pill, EyeOffIcon, EyeOpenIcon, CrossIcon } from "evergreen-ui";
import Grow from "@mui/material/Grow";
const { Search } = Input;

function SearchBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [bottomSheetState, setBottomSheetState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const history = useNavigate();

  const handleSearch = async (val, e) => {
    setIsLoading(true);
    const result = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}form/search`,
      {
        params: {
          key: val,
        },
      }
    );
    if (result.data.success) {
      setSearchResult(result.data.data);
    } else {
      console.log("something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <style type="text/css">
        {`
          .ant-drawer-body::-webkit-scrollbar {
            display: none;
          }
          .ant-drawer-content-wrapper{
            height: 70vh !important;
          }
          .ant-input-affix-wrapper:hover{
            border-color: #03ef62 !important;
          }
          .ant-input-search-button:hover{
            border-color: #03ef62 !important;
          }
        `}
      </style>
      <Search
        placeholder="Search forms by name ..."
        allowClear
        onSearch={(value, event) => {
          handleSearch(value, event);
          setBottomSheetState(true);
        }}
        style={{ width: 300 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Drawer
        title={`Search Results for ${inputValue}...`}
        placement="bottom"
        closable={true}
        onClose={() => {
          setInputValue("");
          setBottomSheetState(false);
        }}
        visible={bottomSheetState}
        key={"bottom"}
      >
        <Grow
          in={!isLoading}
          style={{ transformOrigin: "50 50 50 50" }}
          {...(!isLoading ? { timeout: 1000 } : {})}
        >
          <Row
            className="g-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {searchResult.length < 1 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 60,
                }}
                description={<span>No Search Results Found!</span>}
              />
            ) : (
              searchResult.map((form) => {
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
                            <Tooltip
                              placement="top"
                              title={`~ ${form.username}`}
                            >
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
                              <CalendarOutlined
                                style={{ marginRight: "3px" }}
                              />{" "}
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
                                <Tooltip
                                  placement="top"
                                  title={"Form Accepting Response!"}
                                >
                                  <EyeOpenIcon />
                                </Tooltip>
                              ) : form.isAccepting === false ? (
                                <Tooltip
                                  placement="top"
                                  title={"Form Not Accepting Response!"}
                                >
                                  <EyeOffIcon />
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  placement="top"
                                  title={"No Form Available!"}
                                >
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
                              history(`/`);
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
              })
            )}
          </Row>
        </Grow>
      </Drawer>
    </>
  );
}

export default SearchBar;
