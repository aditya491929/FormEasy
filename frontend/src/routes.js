import Shop from "./Icons/Shop";
import Document from "./Icons/Document";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Forms",
    key: "myforms",
    route: "/dashboard/myforms",
    icon: <Shop size="12px" />,
    noCollapse: true,
  },

  { type: "title", title: "Add Forms", key: "add-forms" },
  {
    type: "collapse",
    name: "Create Form",
    key: "create",
    route: "/dashboard/create",
    icon: <Document size="12px" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Upload Form",
    key: "upload",
    route: "/dashboard/upload",
    icon: <Document size="12px" />,
    noCollapse: true,
  },
  { type: "title", title: "Profile", key: "my-profile" },
  {
    type:"collapse",
    name: "Profile",
    key:"profile",
    route: "/dashboard/profile",
    icon: <Document size="12px" />,
    noCollapse: true,
  },

];

export default routes;
