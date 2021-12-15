import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "../../logo.png";
import classes from "./MainHeader.module.css";
import { UserContext } from "../../context/UserContext";

const MainHeader = (props) => {
  const {userData} = useContext(UserContext);

  const loginBtnClasses = `me-2 ${classes["loginBtn"]}`;
  return (
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
            <Nav.Link className={classes["links"]} as={Link} to={"/home"}>
              Home
            </Nav.Link>
            <Nav.Link className={classes["links"]} as={Link} to={"/about"}>
              About
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {userData.user && <Nav>
            <Button
              variant="dark"
              className={classes["signUpBtn"]}
              onClick={props.logout}
            >
              Logout
            </Button>
            </Nav>
          }
          {!userData.user && <Nav>
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
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
