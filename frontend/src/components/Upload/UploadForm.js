import React from "react";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import Uform from "./components/Form/index";


const UploadForm = () => {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} py={3}>
        <Grid item lg={12}>
        <Uform />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default UploadForm;
