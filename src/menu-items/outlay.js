// assets
import {
  IconDashboard,
  IconGraph,
  IconBox,
  IconCash,
  IconMoneybag,
  IconUserCircle,
} from "@tabler/icons-react";

// constant
const icons = {
  IconDashboard,
  IconGraph,
  IconBox,
  IconCash,
  IconMoneybag,
  IconUserCircle,
};

// ==============================|s| DASHBOARD MENU ITEMS ||============================== //

const outlay = {
  id: "outlay",
  title: "Outlay",
  type: "group",
  children: [
    {
      id: "material-page",
      title: "Material",
      type: "item",
      url: "/material",
      icon: icons.IconBox,
      breadcrumbs: false,
    },
    {
      id: "purchase-page",
      title: "Purchase",
      type: "item",
      url: "/purchase",
      icon: icons.IconCash,
      breadcrumbs: false,
    },
    {
      id: "employee-page",
      title: "Employee",
      type: "item",
      url: "/employee",
      icon: icons.IconUserCircle,
      breadcrumbs: false,
    },
    {
      id: "expense-page",
      title: "Expense",
      type: "item",
      url: "/expense",
      icon: icons.IconMoneybag,
      breadcrumbs: false,
    },
  ],
};

export default outlay;
