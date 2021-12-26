import React from "react";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import ProfileInfo from "./components/profile";


const Profile = () => {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} py={3}>
        <Grid item xs={12} md={6} lg={5} style={{minHeight: '80vh'}}>
        <ProfileInfo />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
            {/* <Projects /> */}
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default Profile;