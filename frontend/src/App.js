import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import Secure from "./components/home/Secure";
// import Loader from "./components/ui/Loader";

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
      <BrowserRouter>
          {!userData.token ? (
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/dashboard" element={<Navigate to='/' />} />
             <Route path="/*" element={<Navigate to='/' />} />
           </Routes>
          )
          : (
            <Routes>
              <Route path="/" element={<Navigate to='/dashboard' />} />
              <Route path="/dashboard" element={<Secure />} />
              <Route path="/*" element={<h1>Error 404</h1>} />
            </Routes>
          )
        }
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
