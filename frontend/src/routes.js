import Document from "./Icons/Document";
import Settings from "./Icons/Settings";

const routes = [
  { type: "title", title: "Profile", key: "my-profile" },
  {
    type:"collapse",
    name: "Profile",
    key:"dashboard",
    route: "/dashboard",
    icon: <Settings size="12px" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Forms",
    key: "myforms",
    route: "/dashboard/myforms",
    icon: <Document size="12px" />,
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

];

export default routes;
