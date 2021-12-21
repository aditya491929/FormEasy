import React from "react";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";
import DragDrop from "./components";



const CreateComponent = () => {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} py={3}>
        <Grid item lg={12}>
          <DragDrop/>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default CreateComponent;