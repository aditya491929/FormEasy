import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Empty } from "antd";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { IdcardOutlined } from "@ant-design/icons";
import { Pill } from "evergreen-ui";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";

const Favorites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("auth-token");

    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}forms/favourites`,
        {
          headers: {
            "x-auth-token": token,
          },
          params: {
            userId: user.id,
          },
        }
      );
      if (response.data.success) {
        setFavourites(response.data.data.favourites);
      } else {
        console.log(response.data.message);
      }
      setLoading(false);
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
      <h1>Favorites</h1>
      {favourites.length < 1 ? (
        loading ?
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress style={{ color: "#03ef62" }} />
        </div>
        :
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={<span>No Forms Found!</span>}
        ></Empty>
      ) : (
        <Grow
          in={!loading}
          style={{ transformOrigin: "50 50 50 50" }}
          {...(!loading ? { timeout: 1000 } : {})}
        >
          <Row
            className="g-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {favourites.map((formId) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ display: "flex", justifyContent: "center" }}
                  key={formId}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title
                          className="mb-2 text-muted"
                          style={{display: 'flex', justifyContent: 'center'}}
                        >
                          <Pill
                            display="inline-flex"
                            margin={0}
                            color="green"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "fit-content",
                              fontSize: '0.75em'
                            }}
                          >
                            <IdcardOutlined style={{ marginRight: "3px" }} />{" "}
                            {formId}
                          </Pill>
                        </Card.Title>
                        <div style={{display: 'flex', justifyContent:'center'}}>
                        <Button
                          variant={"dark"}
                          onClick={() => {
                            history(`/form/${formId}`);
                          }}
                          size="sm"
                        >
                          Fill Form
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

export default Favorites;
