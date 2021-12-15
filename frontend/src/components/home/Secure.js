import React, { useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import MainHeader from "../navbar/MainHeader";
import { Button } from "react-bootstrap";

const Secure = () => {
  const {userData} = useContext(UserContext);
  const history = useNavigate();

  useEffect(() => {
    if(!userData.user){
      history.push('/home');
    }
  }, []);

  // const fetchUserDetails = useCallback(() => {
  //   console.log(userContext)
  //   fetch(process.env.REACT_APP_API_ENDPOINT + "users/currentUser", {
  //     mode:'cors',
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userContext.token}`,
  //     },
  //   }).then(async (response) => {
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data)
  //       setUserContext((oldValues) => {
  //         return { ...oldValues, details: data };
  //       });
  //     } else {
  //       if (response.status === 401) {
  //         window.location.reload();
  //       } else {
  //         setUserContext((oldValues) => {
  //           return { ...oldValues, details: null };
  //         });
  //       }
  //     }
  //   });
  // }, [setUserContext, userContext.token]);

  // useEffect(() => {
  //   if (!userContext.details) {
  //     fetchUserDetails();
  //   }
  // }, [userContext.details, fetchUserDetails]);

  // const logoutHandler = () => {
  //   console.log(userContext.token)
  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}users/logout`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userContext.token}`,
  //     },
  //   }).then(async (respo) => {
  //     console.log(respo)
  //     setUserContext((oldValues) => {
  //       return { ...oldValues, details: undefined, token: null };
  //     });
  //     window.localStorage.setItem("logout", Date.now());
  //   });
  // };

  // const refetchHandler = () => {
  //   setUserContext((oldValues) => {
  //     return { ...oldValues, details: undefined };
  //   });
  // };

  return (
    <>
      <MainHeader />
      {userData.user === null
        ? "Failed to Load User Details"
        : !userData.user ? 'Loading...' :`${userData.user.fname}`}
      <Button variant="dark">
        Logout
      </Button>
      <Button  variant="dark">
        Refetch
      </Button>
    </>
  );
};

export default Secure;
