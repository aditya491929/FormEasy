import React, { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../context/UserContext";
import Logo from "../../logo.png";
import classes from "./MainHeader.module.css";
import axios from "axios";
import NProgress from "nprogress";

const MainHeader = (props) => {
  const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const history = useNavigate();
  const { addToast } = useToasts();

  const logoutHandler = async (event) => {
    event.preventDefault();
    try {
      const logoutResponse = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}users/logout`,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      NProgress.start();
      if (logoutResponse.data.success) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        setUserData({
          token: undefined,
          user: undefined,
        });
        NProgress.done();
        addToast(logoutResponse.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        history("/");
      } else {
        NProgress.done();
        history("/home");
      }
    } catch (err) {
      console.log(err);
      NProgress.done();
    }
  };

  const loginBtnClasses = `me-2 ${classes["loginBtn"]}`;

  return (
    <>
      <style type="text/css">
        {`
          .dropdown-toggle::after {
            display: none;
          }
          .dropdown-item:active {
            color: #fff;
            text-decoration: none;
            background-color: #03ef62;
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
          <Navbar.Brand as={Link} to={userData.user ? "/home" : "/"}>
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              {(userData.user && location.pathname === '/') && (
                <Nav.Link className={classes["links"]} as={Link} to="/home">
                  Home
                </Nav.Link>
              )}
              {userData.user && (
                <Nav.Link className={classes["links"]} as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              )}
              {(userData.user && location.pathname !== '/forms') && (
                <Nav.Link className={classes["links"]} as={Link} to="/form">
                  About
                </Nav.Link>
              )}
            </Nav>
            {userData.user && (
              <Nav>
                <NavDropdown
                  className={classes["dropdown-toggle"]}
                  title={
                    <>
                    <svg
                      fill="white"
                      height="30"
                      width="30"
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
                    <span style={{'color':'white', 'marginLeft': '5px'}}>{userData.user.username}</span>
                    </>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    👋{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {userData.user.username}
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {location.pathname !== "/home" ? (
                    <NavDropdown.Item as={Link} to="/home">
                      <svg
                        height="17"
                        width="18"
                        viewBox="0 0 43.5 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs />
                        <path
                          className="cls-1"
                          id="Home"
                          d="M386.694,1171.71l-18.771-16a2.981,2.981,0,0,0-3.862,0l-18.771,16a3.007,3.007,0,0,0,1.795,5.29v15.99a3.006,3.006,0,0,0,2.985,3.01h31.844a3.006,3.006,0,0,0,2.985-3.01V1177A3.007,3.007,0,0,0,386.694,1171.71ZM365,1193h-1.99v-9h5.97v9H365Zm16.917-19v19h-9.951v-9a2.991,2.991,0,0,0-2.986-3h-5.97a2.991,2.991,0,0,0-2.986,3v9H350.07v-19h-2.849l18.771-16,18.771,16h-2.849Z"
                          transform="translate(-344.25 -1155)"
                        />
                      </svg>{'  '}
                      Home
                    </NavDropdown.Item>
                  ) : (
                    ""
                  )}
                  {location.pathname !== "/dashboard" ? (
                    <NavDropdown.Item as={Link} to="/dashboard">
                      <svg
                        height="17"
                        width="17"
                        viewBox="0 0 44 44"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs />
                        <path
                          className="cls-1"
                          id="Menu"
                          d="M123.416,1262.82A21.929,21.929,0,0,0,101.523,1243c-0.731,0-1.472.04-2.2,0.11a22,22,0,0,0,2.157,43.89c0.731,0,1.472-.04,2.2-0.11A22,22,0,0,0,123.416,1262.82Zm-20.033,21.09q-0.96.09-1.906,0.09a19,19,0,0,1-1.86-37.91q0.96-.09,1.906-0.09A19,19,0,0,1,103.383,1283.91Zm7.628-19.91H91.989a1.5,1.5,0,1,0,0,3h19.022A1.5,1.5,0,1,0,111.011,1264Zm0-6H91.989a1.5,1.5,0,1,0,0,3h19.022A1.5,1.5,0,1,0,111.011,1258Zm0,12H91.989a1.5,1.5,0,1,0,0,3h19.022A1.5,1.5,0,1,0,111.011,1270Z"
                          transform="translate(-79.5 -1243)"
                        />
                      </svg>
                      {"  "}
                      Dashboard
                    </NavDropdown.Item>
                  ) : (
                    ""
                  )}
                  {location.pathname !== "/" ? (
                    <NavDropdown.Item as={Link} to="/">
                      <svg
                        className="feather feather-info"
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
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="16" y2="12" />
                        <line x1="12" x2="12.01" y1="8" y2="8" />
                      </svg>
                      {"  "}
                      About
                    </NavDropdown.Item>
                  ) : (
                    ""
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
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
                    </svg>
                    {"  "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <span style={{'color':'white', 'display': 'flex', 'flexDirection': 'column', 'justifyContent':'center'}}>{userData.user.username}</span> */}
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
