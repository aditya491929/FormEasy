import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Empty } from "antd";
import axios from "axios";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./Categories.module.css";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}form/categories`,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      if (response.data) {
        setCategories(response.data);
      }
    }
    fetchData();
  }, [userData.token]);

  return (
    <>
      <style type="text/css">
        {`
          .MuiBox-root {
            display: flex;
    justify-content: center;
          }
        `}
      </style>
      <h1>Categories</h1>

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
        {categories.length < 1 && (
          <CircularProgress style={{ color: "#03ef62" }} />
        )}
        {categories !== [] ? (
          categories.map((category) => {
            return (
              <Grow in={true} key={category["_id"]}>
                <Paper
                  elevation={5}
                  style={{ backgroundImage: `url(${category["url"]})` }}
                  {...{ timeout: 0.4 }}
                >
                  <div
                    className={classes["category-content"]}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      console.log(category['name']);
                      props.categorySelectHandler(category['name']);
                    }}
                  >
                    <h3 style={{ color: "white" }}>{category["name"]}</h3>
                  </div>
                </Paper>
              </Grow>
            );
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Categories;
