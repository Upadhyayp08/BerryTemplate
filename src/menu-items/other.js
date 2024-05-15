// assets
import {
  IconBrandChrome,
  IconHelp,
  IconBox,
  IconUser,
  IconCash,
  IconCamera,
  IconPencil,
  IconCurrencyDollar,
  IconShoppingCart,
  IconUserFilled,
  IconGraph,
  IconShoppingBag,
} from "@tabler/icons-react";

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconBox,
  IconUser,
  IconUserFilled,
  IconCash,
  IconCamera,
  IconPencil,
  IconCurrencyDollar,
  IconShoppingCart,
  IconGraph,
  IconShoppingBag,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  title: "Others",
  children: [
    {
      id: "blog-page",
      title: "Blog",
      type: "item",
      url: "/blog",
      icon: icons.IconPencil,
      breadcrumbs: false,
    },
    {
      id: "album-page",
      title: "Album",
      type: "item",
      url: "/album",
      icon: icons.IconCamera,
      breadcrumbs: false,
    },
  ],
};

export default other;
