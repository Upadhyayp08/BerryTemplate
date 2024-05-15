// assets
import { IconUser, IconCurrencyDollar } from "@tabler/icons-react";

// constant
const icons = {
  IconUser,
  IconCurrencyDollar,
};

// ==============================|s| DASHBOARD MENU ITEMS ||============================== //

const earning = {
  id: "earning",
  // title: "Earning",
  type: "group",
  children: [
    {
      id: "earning",
      title: "Earning",
      type: "collapse",
      children: [
        {
          id: "customer-page",
          title: "Customer",
          type: "item",
          url: "/customer",
          icon: icons.IconUser,
          breadcrumbs: false,
        },
        {
          id: "sale-page",
          title: "Sales",
          type: "item",
          url: "/sale",
          icon: icons.IconCurrencyDollar,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default earning;
