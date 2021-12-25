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
        <Grid item lg={12} style={{minWidth: '100%', minHeight: '80vh'}}>
        <ProfileInfo />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default Profile;