import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import Logo from "../../logo.png";
import classes from "./MainHeader.module.css";
import { UserContext } from "../../context/UserContext";

const MainHeader = (props) => {
  const { userData } = useContext(UserContext);

  const loginBtnClasses = `me-2 ${classes["loginBtn"]}`;
  return (
    <>
      <style type="text/css">
        {`
          .dropdown-toggle::after {
            display: none;
          }
        `}
      </style>
      <Navbar
        className={classes["navbar"]}
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/home">
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              {userData.user && (
                <Nav.Link
                  className={classes["links"]}
                  as={Link}
                  to="/home"
                >
                  Home
                </Nav.Link>
              )}
              {userData.user && (
                <Nav.Link className={classes["links"]} as={Link} to="/">
                  About
                </Nav.Link>
              )}
            </Nav>
            {userData.user && (
              <Nav>
                <NavDropdown
                  className={classes["dropdown-toggle"]}
                  title={
                    <svg
                      fill="white"
                      height="37"
                      width="37"
                      viewBox="0 0 44 44"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs />
                      <path
                        className="cls-1"
                        id="User"
                        d="M190,1243a22,22,0,1,0,22,22A22.025,22.025,0,0,0,190,1243Zm-19,22a19,19,0,1,1,33.934,11.72,19.225,19.225,0,0,0-9.488-7.39,9.513,9.513,0,0,0,2.554-6.58c0-4.96-3.589-9-8-9s-8,4.04-8,9a9.469,9.469,0,0,0,2.755,6.78,17.812,17.812,0,0,0-9.3,7.69A18.947,18.947,0,0,1,171,1265Zm19.5,3.5c-0.549,0-1.094.04-1.636,0.09-2.213-.61-3.864-2.99-3.864-5.84,0-3.31,2.239-6,5-6s5,2.69,5,6a5.935,5.935,0,0,1-3.677,5.79C191.049,1268.52,190.777,1268.5,190.5,1268.5Zm-12.816,10.95a14.628,14.628,0,0,1,11.032-7.82,7.77,7.77,0,0,0,1.284.12,6.978,6.978,0,0,0,1.655-.19c4.848,0.46,8.991,3.79,11.18,7.42A18.93,18.93,0,0,1,177.684,1279.45Z"
                        transform="translate(-168 -1243)"
                      />
                    </svg> 
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>
                  👋 {userData.user.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={props.logout}>
                    <svg
                      className="feather feather-log-out"
                      height="17"
                      width="17"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>{" "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!userData.user && (
              <Nav>
                <Button
                  variant="dark"
                  className={loginBtnClasses}
                  onClick={props.onPress}
                >
                  Login
                </Button>
                <Button
                  variant="dark"
                  className={classes["signUpBtn"]}
                  onClick={props.onPress}
                >
                  SignUp
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainHeader;
