import React, { useCallback, useContext, useEffect } from "react";
import MainHeader from "../navbar/MainHeader";
import { UserContext } from "../../context/UserContext";
import { Button } from "react-bootstrap";

const Secure = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/currentUser", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  const logoutHandler = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}users/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
  };

  const refetchHandler = () => {
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined };
    });
  };

  return (
    <>
      <MainHeader />
      {userContext.details === null
        ? "Failed to Load User Details"
        : `${userContext.details}`}
      <Button onClick={logoutHandler} variant="dark">
        Logout
      </Button>
      <Button onClick={refetchHandler} variant="dark">
        Refetch
      </Button>
    </>
  );
};

export default Secure;
