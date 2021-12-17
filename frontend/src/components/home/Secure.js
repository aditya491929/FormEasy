import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import MainHeader from "../navbar/MainHeader";

const Secure = () => {
  const {userData} = useContext(UserContext);
  const history = useNavigate();
  useEffect(() => {
    console.log(userData)
    if(!userData.user){
      history('/');
    }
  }, [userData, history]);

  return (
    <>
      <MainHeader />
      {userData.user === null
        ? "Failed to Load User Details"
        : !userData.user ? 'Loading...' :`Welcome,${userData.user.username}!`}
    </>
  );
};

export default Secure;
