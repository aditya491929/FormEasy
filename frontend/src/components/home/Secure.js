import React, { useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import MainHeader from "../navbar/MainHeader";
import axios from "axios";

const Secure = () => {
  const {userData, setUserData} = useContext(UserContext);
  const history = useNavigate();

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

  return (
    <>
      <MainHeader logout={logoutHandler} />
      {userData.user === null
        ? "Failed to Load User Details"
        : !userData.user ? 'Loading...' :`Welcome,${userData.user.username}!`}
    </>
  );
};

export default Secure;
