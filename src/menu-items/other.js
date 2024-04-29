// assets
import {
  IconBrandChrome,
  IconHelp,
  IconBox,
  IconUser,
  IconCash,
  IconCamera,
  IconPencil,
} from "@tabler/icons-react";

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconBox,
  IconUser,
  IconCash,
  IconCamera,
  IconPencil,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  title: "Dashboard",
  children: [
    {
      id: "sample-page",
      title: "Customer",
      type: "item",
      url: "/",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
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
      icon: icons.IconCash,
      breadcrumbs: false,
    },
    {
      id: "expense-page",
      title: "Expense",
      type: "item",
      url: "/expense",
      icon: icons.IconCash,
      breadcrumbs: false,
    },
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
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ],
};

export default other;
