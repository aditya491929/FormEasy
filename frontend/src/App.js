import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastProvider } from "react-toast-notifications";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useNavController,
  setMiniSidenav,
  setOpenConfigurator,
} from "./context/NavContext";
import axios from "axios";
import Home from "./components/landingPage/Home";
import Secure from "./components/home/Secure";
import Error from "./components/error/Error";
import UploadPage from "./components/upload/UploadPage";
import FormPage from "./components/FormPage/FormPage";
import SuiBox from "./components/SuiBox";
import Icon from "@mui/material/Icon";
import Configurator from "./components/Configurator";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "./routes";
import "./App.css";
import CreatePage from "./components/Create/createPage";
import MyFormPage from "./components/myforms/MyFormPage";
import ProfilePage from "./components/profile/profilePage";
import PublicProfile from "./components/publicProfile";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [controller, dispatch] = useNavController();
  const { direction, layout } = controller;

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

  return direction === "rtl" ? (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <ToastProvider placement="top-center">
          <CssBaseline />
          {!userData.token ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Secure />} />
              <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/dashboard/upload" element={<Navigate to="/" />} />
              <Route path="/dashboard/create" element={<Navigate to="/" />} />
              <Route path="/dashboard/myforms" element={<Navigate to="/" />} />
              {/* <Route path="/dashboard/profile" element={<Navigate to='/' />}/> */}
              <Route path="/form/:id" element={<FormPage />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Secure />} />
              <Route path="/dashboard" element={<ProfilePage />} />
              <Route path="/dashboard/upload" element={<UploadPage />} />
              <Route path="/dashboard/create" element={<CreatePage />} />
              <Route path="/dashboard/myforms" element={<MyFormPage />} />
              {/* <Route path='/dashboard/profile' element={<ProfilePage />}/> */}
              <Route path="/form/:id" element={<FormPage />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          )}
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
              <Route path="/home" element={<Secure />} />
              <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/dashboard/upload" element={<Navigate to="/" />} />
              <Route path="/dashboard/create" element={<Navigate to="/" />} />
              <Route path="/dashboard/myforms" element={<Navigate to="/" />} />
              {/* <Route path="/dashboard/profile" element={<Navigate to='/' />}/> */}
              <Route path="/form/:id" element={<FormPage />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Secure />} />
              <Route path="/dashboard" element={<ProfilePage />} />
              <Route path="/dashboard/upload" element={<UploadPage />} />
              <Route path="/dashboard/create" element={<CreatePage />} />
              <Route path="/dashboard/myforms" element={<MyFormPage />} />
              {/* <Route path='/dashboard/profile' element={<ProfilePage />}/> */}
              <Route path="/form/:id" element={<FormPage />} />
              <Route path="/profile/:id" element={<PublicProfile />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes(routes)}
            <Route from="*" to="/dashboard" />
          </Routes>
        </ToastProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
