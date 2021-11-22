import React, { useContext, useCallback, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/landingPage/Home";
import { UserContext } from "./context/UserContext";
import Secure from "./components/home/Secure";
import Loader from "./components/ui/Loader";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}users/refreshToken`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return userContext.token === null ? (
    <Home />
  ) : userContext.token ? (
    <Secure />
  ) : (
    <Loader />
  );
}

export default App;
