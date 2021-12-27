import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";

// custom styles for the NotificationItem
import { menuItem, menuImage } from "./styles";

const NotificationItem = forwardRef(({ color, image, title, icon, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <SuiBox
      width="2.25rem"
      height="2.25rem"
      mt={0.25}
      mr={2}
      mb={0.25}
      borderRadius="lg"
      sx={(theme) => menuImage(theme, { color })}
    >
      <Icon style={{"color":"white"}}>{icon}</Icon>
    </SuiBox>
    <SuiBox>
      <SuiTypography variant="button" textTransform="capitalize" fontWeight="regular">
        <strong>{title[0]}</strong> {title[1]}
      </SuiTypography>
    </SuiBox>
  </MenuItem>
));

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  image: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
