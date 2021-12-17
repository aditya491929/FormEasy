import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React base styles
import typography from "../../../../assets/theme/base/typography";

// Soft UI Dashboard PRO React components
import SuiBox from "../../../SuiBox";
import SuiTypography from "../../../SuiTypography";
import SuiProgress from "../../../SuiProgress";

function ReportsBarChartItem({ color, icon, label, progress }) {
  const { size } = typography;

  return (
    <SuiBox width="100%">
      <SuiBox display="flex" alignItems="center" mb={2}>
        <SuiBox
          bgColor={icon.color}
          width="1.25rem"
          height="1.25rem"
          borderRadius="sm"
          color="white"
          fontSize={size.xs}
          display="flex"
          justifyContent="center"
          alignItems="center"
          shadow="md"
          mr={1}
          variant="gradient"
        >
          <Icon>{icon.component}</Icon>
        </SuiBox>
        <SuiTypography
          variant="caption"
          textTransform="capitalize"
          fontWeight="medium"
          color="text"
        >
          {label}
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={1}>
        <SuiTypography variant="h4" fontWeight="bold" color={color}>
          {progress.content}
        </SuiTypography>
        <SuiBox width="75%" mt={0.5}>
          <SuiProgress value={progress.percentage} color={color} />
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of ReportsBarChartItem
ReportsBarChartItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the ReportsBarChartItem
ReportsBarChartItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"])
      .isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  progress: PropTypes.shape({
    content: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,
};

export default ReportsBarChartItem;
