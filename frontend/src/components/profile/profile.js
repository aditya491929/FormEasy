import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import ProfileInfo from "./components/profile";
import MiniStatisticsCard from "../Cards/StatisticsCards/MiniStatisticsCard";
import Card from "@mui/material/Card";
import SuiBox from "../SuiBox";
import SuiTypography from "../SuiTypography";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [responses, setResponses] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("auth-token");
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}forms/myforms`,
        {
          params: {
            userId: user.id,
          },
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.data.success) {
        setUserData(response.data.data);
        let count = 0;
        response.data.data.map((form) => {
          count += parseInt(form.responseCount);
        });
        setResponses(count.valueOf());
      } else {
        console.log("Something Went Wrong!");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} py={3}>
        <Grid item xs={12} md={6} lg={5} style={{ minHeight: "80vh" }}>
          <ProfileInfo />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Card style={{ minHeight: "40%" }}>
            <SuiBox pt={3} px={3}>
              <SuiTypography variant="h6" fontWeight="bold">
                Statistics
              </SuiTypography>
            </SuiBox>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ color: "#03ef62" }} />
              </div>
            ) : (
              <SuiBox p={2}>
                <Grid container spacing={3} py={3}>
                  <Grid item xs={12} md={6} style={{ marginBottom: "20px" }}>
                    <MiniStatisticsCard
                      bgColor="dark"
                      title={{ text: "Forms" }}
                      count={userData.length}
                      icon={{ color: "white", component: "article" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} style={{ marginBottom: "20px" }}>
                    <MiniStatisticsCard
                      bgColor="dark"
                      title={{ text: "Responses" }}
                      count={responses}
                      icon={{ color: "white", component: "apps" }}
                    />
                  </Grid>
                </Grid>
              </SuiBox>
            )}
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default Profile;
