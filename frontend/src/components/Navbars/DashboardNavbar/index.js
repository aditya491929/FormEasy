import { useState, useEffect, useContext} from "react";
// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";
import SuiInput from "../../SuiInput";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "../../Breadcrumbs";
import NotificationItem from "../../Items/NotificationItem";

import NProgress from "nprogress";
import { UserContext } from "../../../context/UserContext";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "../../Navbars/DashboardNavbar/styles";

// Soft UI Dashboard PRO React context
import {
  useNavController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context/NavContext";

// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";

function DashboardNavbar({ absolute, light, isMini }) {
  // const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const history = useNavigate();
  const { addToast } = useToasts();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useNavController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

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

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const notificationMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["Logout", ""]}
        date=""
        onClick={logoutHandler}
      />
    </Menu>
  );


  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SuiBox>
        {isMini ? null : (
          <SuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SuiBox pr={1}>
              <SuiInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SuiBox>
            <SuiBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in"> */}
                <IconButton sx={navbarIconButton} size="small" onClick={handleOpenMenu}>
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                  <SuiTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    {userData.user ? `${userData.user.username}` : 'Sign In'}
                  </SuiTypography>
                </IconButton>
              {/* </Link> */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {notificationMenu()}
            </SuiBox>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
