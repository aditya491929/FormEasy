import { useState, useEffect, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";
import Breadcrumbs from "../../Breadcrumbs";
import NotificationItem from "../../Items/NotificationItem";
import NProgress from "nprogress";
import { UserContext } from "../../../context/UserContext";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "../../Navbars/DashboardNavbar/styles";
import {
  useNavController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context/NavContext";
import team2 from "../../../assets/images/team-2.jpg";

function DashboardNavbar({ absolute, light, isMini }) {
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
    if (!fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

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
        title={["Home", ""]}
        icon={"home"}
        onClick={() => {history('/home')}}
      />
      <NotificationItem
        title={["Logout", ""]}
        icon={"logout"}
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
            </SuiBox>
            <SuiBox color={light ? "white" : "inherit"}>
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

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
