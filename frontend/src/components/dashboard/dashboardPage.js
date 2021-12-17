import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import MainHeader from "../navbar/MainHeader";
import axios from "axios";
import { useNavController, setMiniSidenav, setOpenConfigurator } from "../../context/NavContext";
import Sidenav from "../Sidenav";
import brand from "../../assets/logo.png";
import routes from "../../routes";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../assets/theme";
import themeRTL from "../../assets/theme/theme-rtl";
import Dashboard from "./dashboard";

const DashboardPage = () => {
  const {userData, setUserData} = useContext(UserContext);
  const history = useNavigate();
  
  const [controller, dispatch] = useNavController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  
  
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    console.log(userData)
    if(!userData.user){
      history('/');
    }
  }, [userData, history]);

  const logoutHandler = async (event) =>{
    event.preventDefault();
    try{
      const logoutResponse = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/logout`, {
        headers: { "x-auth-token": userData.token },
      });
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      if (logoutResponse.data.message){
        setUserData({
          token: undefined,
          user: undefined
        })
        history('/');
      }else{
        history('/dashboard')
      }
    }catch(err){
      console.log(err);
    }
  }

  return direction === "rtl" ? (
    <ThemeProvider theme={themeRTL}>
        {/* <MainHeader logout={logoutHandler} /> */}
        {layout === "dashboard" && (
          userData.user === null
          ? "Failed to Load User Details"
          : !userData.user ? 'Loading...' :
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="FormEasy"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
        )}
        {layout === "vr"}
        <Dashboard/>
      </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      {/* <MainHeader logout={logoutHandler} /> */}
      {layout === "dashboard" && (
        userData.user === null
        ? "Failed to Load User Details"
        : !userData.user ? 'Loading...' :
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="FormEasy"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
      )}
      {layout === "vr"}
      <Dashboard/>
    </ThemeProvider>
  );
};

export default DashboardPage;
