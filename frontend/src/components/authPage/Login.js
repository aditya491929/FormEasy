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
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      history('/dashboard');
    } catch (err) {
      console.log(err)
      setIsSubmitting(false);
      setError(err)
    }
  };

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
