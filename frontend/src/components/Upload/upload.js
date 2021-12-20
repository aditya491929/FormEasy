// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import React, { Component, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import axios from "axios";

// Soft UI Dashboard React components
import SuiBox from "../SuiBox";
import SuiTypography from "../SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "../LayoutContainers/DashboardLayout";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import Footer from "../Footer";

// import typography from "../../assets/theme/base/typography";


// functi

//   const { size } = typography;
//   // const { chart, items } = reportsBarChartData;

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SuiBox py={3}>
//         <SuiBox mb={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6} xl={3}>
//               {/* <MiniStatisticsCard
//                 title={{ text: "Health" }}
//                 count="$53,000"
//                 percentage={{ color: "success", text: "+55%" }}
//                 icon={{ color: "info", component: "paid" }}
//               /> */}
//             </Grid>
//             <Grid item xs={12} sm={6} xl={3}>
//               {/* <MiniStatisticsCard
//                 title={{ text: "Entrance Exams" }}
//                 count="2,300"
//                 percentage={{ color: "success", text: "+3%" }}
//                 icon={{ color: "info", component: "public" }}
//               /> */}
//             </Grid>
//             <Grid item xs={12} sm={6} xl={3}>
//               {/* <MiniStatisticsCard
//                 title={{ text: "Finance" }}
//                 count="+3,462"
//                 percentage={{ color: "error", text: "-2%" }}
//                 icon={{ color: "info", component: "emoji_events" }}
//               /> */}
//             </Grid>
//             <Grid item xs={12} sm={6} xl={3}>
//               {/* <MiniStatisticsCard
//                 title={{ text: "sales" }}
//                 count="$103,430"
//                 percentage={{ color: "success", text: "+5%" }}
//                 icon={{
//                   color: "info",
//                   component: "shopping_cart",
//                 }}
//               /> */}
//             </Grid>
//           </Grid>
//         </SuiBox>
//         <SuiBox mb={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} lg={6}>
//               {/* <BuildByDevelopers /> */}
//             </Grid>
//             <Grid item xs={12} lg={6}>
//               {/* <WorkWithTheRockets /> */}
//               {/* <BuildByDevelopers /> */}

//             </Grid>
//           </Grid>
//         </SuiBox>
//         {/* <SuiBox mb={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} lg={5}>
//               <ReportsBarChart
//                 title="active users"
//                 description={
//                   <>
//                     (<strong>+23%</strong>) than last week
//                   </>
//                 }
//                 chart={chart}
//                 items={items}
//               />
//             </Grid>
//             <Grid item xs={12} lg={7}>
//               <GradientLineChart
//                 title="Sales Overview"
//                 description={
//                   <SuiBox display="flex" alignItems="center">
//                     <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
//                       <Icon className="font-bold">arrow_upward</Icon>
//                     </SuiBox>
//                     <SuiTypography variant="button" color="text" fontWeight="medium">
//                       4% more{" "}
//                       <SuiTypography variant="button" color="text" fontWeight="regular">
//                         in 2021
//                       </SuiTypography>
//                     </SuiTypography>
//                   </SuiBox>
//                 }
//                 height="20.25rem"
//                 chart={gradientLineChartData}
//               />
//             </Grid>
//           </Grid>
//         </SuiBox> */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={8}>
//             {/* <Projects /> */}
//           </Grid>
//           <Grid item xs={12} md={6} lg={4}>
//             {/* <OrderOverview /> */}
//           </Grid>
//         </Grid>
//       </SuiBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Upload;

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formname: '',
            description: '',
            formCategory: '',
            formUrl: '',
            formCategory: '--category--'

        }
    }

    handleformnameChange = (event) => {
        this.setState({
            formname: event.target.value
        })
    }

    handleDescriptionChange = event => {
        this.setState({
            description: event.target.value
        })
    }

    handleFormCategory = event => {
        this.setState({
            formCategory: event.target.value
        })
    }

    handleSubmit = event => {
        alert()
        event.preventDefault()
    }

    render() {
        return (
            <DashboardLayout>
              <DashboardNavbar />
            <SuiBox>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Form Name</label>
                        <input type="text" value={this.state.formname}
                            onChange={this.handleformnameChange} />
                    </div>
                    <div>
                        <label>Form Category</label>
                        <select value={this.state.formCategory}
                            onClick={this.handleFormCategory}>
                            <option value="Survey">Survey</option>
                            <option value="Survey">Survey</option>
                            <option value="Education">Education</option>
                            <option value="Job Application">Job Application</option>
                            <option value="Admission">Admission</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Membership">Membership</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <input type='file' name='file'></input>
                    <div>
                        <label>Description</label>
                        <textarea value={this.state.description}
                            onChange={this.handleDescriptionChange}>
                        </textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>

            </SuiBox>
            <Footer/>
            </DashboardLayout>
        )
    }
}

export default Upload;