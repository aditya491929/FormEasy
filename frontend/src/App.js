import React, { useState, useEffect } from "react";
// import { Routes, Route, Switch, BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastProvider } from 'react-toast-notifications';
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import Secure from "./components/home/Secure";
import Dashboard from "./components/dashboard/dashboardPage";
import SuiBox from "./components/SuiBox";
import Sidenav from "./components/Sidenav";
import brand from './assets/logo.png';
import Icon from "@mui/material/Icon";
import Configurator from "./components/Configurator";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "./routes";
import themeRTL from "./assets/theme/theme-rtl";
import theme from "./assets/theme";
import { useNavController,  setMiniSidenav, setOpenConfigurator } from "./context/NavContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [controller, dispatch] = useNavController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  // const { pathname } = useLocation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      console.log(token)
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      else {
        const tokenResponse = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}users/verifyToken`,
          null,
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(tokenResponse.data)  
        if (tokenResponse.data) {
          const userRes = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}users/currentUser`,
            {
              headers: { "x-auth-token": token },
            }
          );
          setUserData({
            token,
            user: userRes.data.user,
          });
        }
      }
    };

    checkLoggedIn();
  }, []);

  // Open sidenav when mouse enter on mini sidenav
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

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });


    const configsButton = (
      <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.5rem"
        height="3.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={handleConfiguratorOpen}
      >
        <Icon fontSize="default" color="inherit">
          settings
        </Icon>
      </SuiBox>
    );


  // return (
  //   <UserContext.Provider value={{ userData, setUserData }}>
  //     <ThemeProvider theme={themeRTL}>
  //     <ToastProvider placement="top-center">
  //       <BrowserRouter>
  //           {!userData.token ? (
  //           <Routes>
  //             <Route path="/" element={<Home />} />
  //             <Route path="/home" element={<Navigate to='/' />} />
  //             <Route path="/dashboard" element={<Navigate to='/' />}/>
  //             <Route path="/*" element={<Navigate to='/' />} />
  //           </Routes>
  //           )
  //           : (
  //             <Routes>
  //               <Route path="/" element={<Home />} />
  //               <Route path="/home" element={<Secure />} />
  //               <Route path="/dashboard" element={<Dashboard />}/>
  //               <Route path="/*" element={<h1>Error 404</h1>} />
  //             </Routes>
  //           )
  //         }
  //       </BrowserRouter>
  //     </ToastProvider>
  //     </ThemeProvider>
  //   </UserContext.Provider>
  // );



  return direction === "rtl" ? (
      <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
    {/* <ThemeProvider theme={themeRTL}> */}
        <ToastProvider placement="top-center">
        <CssBaseline />
            {!userData.token ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to='/' />} />
              <Route path="/dashboard" element={<Navigate to='/' />}/>
              <Route path="/*" element={<Navigate to='/' />} />
            </Routes>
            )
            : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Secure />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/*" element={<h1>Error 404</h1>} />
              </Routes>
            )
          }
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Navigate from="*" to="/dashboard" />
        </Routes>
        </ToastProvider>
      {/* </ThemeProvider> */}
    </UserContext.Provider>
        </BrowserRouter>
  ) : (
      <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
    {/* <ThemeProvider theme={theme}> */}
      <ToastProvider placement="top-center">
      <CssBaseline />
            {!userData.token ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to='/' />} />
              <Route path="/dashboard" element={<Navigate to='/' />}/>
              <Route path="/*" element={<Navigate to='/' />} />
            </Routes>
            )
            : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Secure />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/*" element={<h1>Error 404</h1>} />
              </Routes>
            )
          }
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route from="*" to="/dashboard" />
      </Routes>
      </ToastProvider>
    {/* </ThemeProvider> */}
    </UserContext.Provider>
        </BrowserRouter>
  );
}

export default App;
