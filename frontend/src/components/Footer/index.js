import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import SuiBox from "../SuiBox";
import SuiTypography from "../SuiTypography";
import typography from "../../assets/theme/base/typography";

function Footer({ aditya, aayush, rahul }) {
  const { size } = typography;
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
        &copy; {new Date().getFullYear()}, made by
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
      </SuiBox>
    </SuiBox>
   );
}

Footer.defaultProps = {
  aditya: { href: "https://www.github.com/aditya491929", name: "Aditya"},
  aayush: { href: "https://www.github.com/aayushOz11", name: "Aayush"},
  rahul: { href: "https://www.github.com/RahulPanchal-15", name: "Rahul" },
};

Footer.propTypes = {
  aditya: PropTypes.objectOf(PropTypes.string),
  aayush: PropTypes.objectOf(PropTypes.string),
  rahul: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
