import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "../SuiBox";
import SuiTypography from "../SuiTypography";

// Soft UI Dashboard PRO React base styles
import typography from "../../assets/theme/base/typography";

function Footer({ aditya, aayush, rahul , links }) {


  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SuiBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SuiTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SuiTypography>
        </Link>
      </SuiBox>
    ));

  return (
    <SuiBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <SuiBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </SuiBox>
        by
        <Link href={aditya.href} target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
            &nbsp;{aditya.name}&nbsp;
          </SuiTypography>
        </Link>,
        <Link href={aayush.href} target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
            &nbsp;{aayush.name}&nbsp;
          </SuiTypography>
        </Link>,
        <Link href={rahul.href} target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
            &nbsp;{rahul.name}&nbsp;
          </SuiTypography>
        </Link>
        for a better web.
      </SuiBox>
      <SuiBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  aditya: { href: "https://www.github.com/", name: "Aditya"},
  aayush: { href: "https://www.github.com/", name: "Aayush"},
  rahul: { href: "https://www.github.com/", name: "Rahul" },
  
  links: [
    { href: "https://www.creative-tim.com/presentation", name: "About Us" },
    { href: "https://www.creative-tim.com/license", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  aditya: PropTypes.objectOf(PropTypes.string),
  aayush: PropTypes.objectOf(PropTypes.string),
  rahul: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
