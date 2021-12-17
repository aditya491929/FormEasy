import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import NProgress from 'nprogress';
import './nprogress.css';

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserData} = useContext(UserContext);
  const history = useNavigate();

  const fnameChangeHandler = (event) => {
    setFname(event.target.value);
  };

  const lnameChangeHandler = (event) => {
    setLname(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    NProgress.start();
    setIsSubmitting(true);
    setError("");
    try{
      const newUser = {
        fname,
        lname,
        username,
        email,
        password,
      }
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/signup`, newUser);
      setIsSubmitting(false);
      const loginResponse = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/login`, {
        email,
        password
      });
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      NProgress.done();
      history('/home');
    } catch (err) {
      setIsSubmitting(false);
      NProgress.done();
      err.response.data.msg && setError(err.response.data.msg)
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={fname}
                onChange={fnameChangeHandler}
              />
            </Col>
            <Col>
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lname}
                onChange={lnameChangeHandler}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerFormBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={usernameChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerFormBasicEmail">
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

        <Form.Group className="mb-3" controlId="registerFormBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerFormBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up' : 'Sign Up'}
        </Button>
      </Form>
    </>
  );
};

export default Register;
