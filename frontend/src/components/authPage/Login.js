import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Alert } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserData} = useContext(UserContext);
  const history = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try{
      const loginUser = {
        email,
        password
      }
      const loginResponse = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/login`, loginUser);
      setIsSubmitting(false);
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/home');
    } catch (err) {
      setIsSubmitting(false);
      err.response.data.msg && setError(err.response.data.msg)
    }
  };

  // const formSubmitHandler = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     email: email,
  //     password: password,
  //   }
  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}users/login`, {
  //     method:'POST',
  //     headers:{
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     localStorage.setItem('token', data.token)
  //   })
  // }

  // useEffect(() => {

  // })

  // const formSubmitHandler = (event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   setError("");
    
  //   const genericErrorMessage = "Something went wrong! Please try again later.";

  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}users/login`, {
  //     mode:'cors',
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username: email, password }),
  //   })
  //     .then(async (response) => {
  //       setIsSubmitting(false);
  //       if (!response.ok) {
  //         if (response.status === 400) {
  //           setError("Please fill all the fields correctly!");
  //         } else if (response.status === 401) {
  //           setError("Invalid email and password combination.");
  //         } else {
  //           setError(genericErrorMessage);
  //         }
  //       } else {
  //         const data = await response.json();
  //         console.log(data.token)
  //         Cookie.set("token", data.token)
  //         setUserContext((oldValues) => {
  //           return { ...oldValues, token: data.token };
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsSubmitting(false);
  //       setError(genericErrorMessage);
  //     });
  // };

  return (
    <>
      {error && (
        <Alert key="1" variant="danger">
          {error}
        </Alert>
      )}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="loginFormBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={emailChangeHandler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginFormBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginFormBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>
      </Form>
    </>
  );
};

export default Login;
