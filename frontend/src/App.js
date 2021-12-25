import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastProvider } from "react-toast-notifications";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import Secure from "./components/home/Secure";
import Error from "./components/error/Error";
import Dashboard from "./components/dashboard/dashboardPage";
import UploadPage from "./components/upload/UploadPage";
import FormPage from "./components/FormPage/FormPage";
import SuiBox from "./components/SuiBox";
import Icon from "@mui/material/Icon";
import Configurator from "./components/Configurator";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "./routes";
import "./App.css";
import { useNavController,  setMiniSidenav, setOpenConfigurator } from "./context/NavContext";
import CreatePage from "./components/Create/createPage";
import MyFormPage from "./components/myforms/MyFormPage";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [controller, dispatch] = useNavController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      console.log(token);
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      } else {
        const tokenResponse = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}users/verifyToken`,
          null,
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(tokenResponse.data);
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
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
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

  return direction === "rtl" ? (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <ToastProvider placement="top-center">
          <CssBaseline />
          {!userData.token ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to='/' />} />
              <Route path="/dashboard" element={<Navigate to='/' />}/>
              <Route path="/dashboard/upload" element={<Navigate to='/' />}/>
              <Route path="/dashboard/create" element={<Navigate to='/' />}/>
              <Route path="/dashboard/myforms" element={<Navigate to='/' />}/>
              <Route path="/form/:id" element={<FormPage />}/>
              <Route path="/*" element={<Error />} />
            </Routes>
            )
            : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Secure />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/dashboard/upload" element={<UploadPage/>}/>
                <Route path="/dashboard/create" element={<CreatePage/>}/>
                <Route path="/dashboard/myforms" element={<MyFormPage/>}/>
                <Route path="/form/:id" element={<FormPage/>}/>
                <Route path="/*" element={<Error />} />
              </Routes>
            )
          }
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Navigate from="*" to="/dashboard" />
        </Routes>
        </ToastProvider>
      </UserContext.Provider>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <ToastProvider placement="top-center">
          <CssBaseline />
          {!userData.token ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to='/' />} />
              <Route path="/dashboard" element={<Navigate to='/' />}/>
              <Route path="/dashboard/upload" element={<Navigate to='/' />}/>
              <Route path="/dashboard/create" element={<Navigate to='/' />}/>
              <Route path="/dashboard/myforms" element={<Navigate to='/' />}/>
              <Route path="/form/:id" element={<FormPage />}/>
              <Route path="/*" element={<Error />} />
            </Routes>
            )
            : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Secure />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/dashboard/upload" element={<UploadPage/>}/>
                <Route path="/dashboard/create" element={<CreatePage/>}/>
                <Route path="/dashboard/myforms" element={<MyFormPage/>}/>
                <Route path="/form/:id" element={<FormPage/>}/>
                <Route path="/*" element={<Error />} />
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
