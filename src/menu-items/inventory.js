// assets
import { IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";

// constant
const icons = {
  IconShoppingBag,
  IconShoppingCart,
};

// ==============================|s| DASHBOARD MENU ITEMS ||============================== //

const inventory = {
  id: "inventory",
  // title: "Inventory",
  type: "group",
  children: [
    {
      id: "inventory",
      title: "Inventory",
      type: "collapse",
      children: [
        {
          id: "item-page",
          title: "Item",
          type: "item",
          url: "/item",
          icon: icons.IconShoppingBag,
          breadcrumbs: false,
        },
        {
          id: "stock-page",
          title: "Stock",
          type: "item",
          url: "/stock",
          icon: icons.IconShoppingCart,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default inventory;
