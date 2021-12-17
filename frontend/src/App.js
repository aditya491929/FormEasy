import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import Secure from "./components/home/Secure";
import Dashboard from "./components/dashboard/dashboardPage";
import { ThemeProvider } from "@mui/material/styles";

import themeRTL from "./assets/theme/theme-rtl";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

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

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <ThemeProvider theme={themeRTL}>
        <BrowserRouter>
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
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
