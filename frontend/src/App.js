import React, {useState, useEffect } from "react";
import { Routes, BrowserRouter, Route} from "react-router-dom";
import axios from 'axios';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import { UserContext } from "./context/UserContext";
import Secure from "./components/home/Secure";
// import Loader from "./components/ui/Loader";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if(token == null){
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenResponse = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/verifyToken`, null, {
        headers: {'x-auth-token': token}
      });

      if (tokenResponse.data) {
        const userRes = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/currentUser`, {
          headers: {'x-auth-token': token},
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);


  // const [userContext, setUserContext] = useContext(UserContext);
  
  // const verifyUser = useCallback(() => {
  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}users/refreshToken`, {
  //     mode:'cors',
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //   }).then(async response => {
  //     if (response.ok) {
  //       const data = await response.json()
  //       console.log(data)
  //       setUserContext(oldValues => {
  //         return { ...oldValues, token: data.token }
  //       })
  //     } else {
  //       setUserContext(oldValues => {
  //         return { ...oldValues, token: null }
  //       })
  //     }
  //     setTimeout(verifyUser, 5 * 60 * 1000)
  //   })
  // }, [setUserContext])

  // useEffect(() => {
  //   verifyUser()
  // }, [verifyUser])

  // const syncLogout = useCallback(event => {
  //   if (event.key === "logout") {
  //     window.location.reload()
  //   }
  // }, [])

  // useEffect(() => {
  //   window.addEventListener("storage", syncLogout)
  //   return () => {
  //     window.removeEventListener("storage", syncLogout)
  //   }
  // }, [syncLogout])

  // return userContext.token === null ? (
  //   <Home />
  // ) : userContext.token ? (
  //   <Secure />
  // ) : (
  //   <Loader />
  // );



  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/dashboard" component={Secure} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
