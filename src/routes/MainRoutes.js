import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import Addproduct from "views/sample-page/addproduct";
import Materialmain from "views/pages/Material/Materialmain";
import Addmaterial from "views/pages/Material/Addmaterial";
import Purchasemain from "views/pages/Purchase/Purchasemain";
import Addpurchase from "views/pages/Purchase/Addpurchase";
import Employeemain from "views/pages/Employee/Employeemain";
import Addemployee from "views/pages/Employee/Addemployee";
import Expensemain from "views/pages/Expense/Expensemain";
import Addexpense from "views/pages/Expense/Addexpense";
import Blogmain from "views/pages/Blog/Blogmain";
import Addblog from "views/pages/Blog/Addblog";
import Albummain from "views/pages/Album/Albummain";
import Addalbum from "views/pages/Album/Addalbum";
import Gallery from "views/pages/Album/Gallery";
import Salemain from "views/pages/Sale/Salemain";
import Addsale from "views/pages/Sale/Addsale";
import Stockmain from "views/pages/Stock/Stockmain";
import Addstock from "views/pages/Stock/Addstock";
import Itemmain from "views/pages/Item/Itemmain";
import Additem from "views/pages/Item/Additem";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "/customer",
      element: <SamplePage />,
    },
    {
      path: "add-customer",
      element: <Addproduct />,
    },
    {
      path: "add-customer/:id",
      element: <Addproduct />,
    },
    {
      path: "material",
      element: <Materialmain />,
    },
    {
      path: "add-material",
      element: <Addmaterial />,
    },
    {
      path: "add-material/:id",
      element: <Addmaterial />,
    },
    {
      path: "purchase",
      element: <Purchasemain />,
    },
    {
      path: "add-purchase",
      element: <Addpurchase />,
    },
    {
      path: "add-purchase/:id",
      element: <Addpurchase />,
    },
    {
      path: "employee",
      element: <Employeemain />,
    },
    {
      path: "add-employee",
      element: <Addemployee />,
    },
    {
      path: "add-employee/:id",
      element: <Addemployee />,
    },
    {
      path: "expense",
      element: <Expensemain />,
    },
    {
      path: "add-expense",
      element: <Addexpense />,
    },
    {
      path: "add-expense/:id",
      element: <Addexpense />,
    },
    {
      path: "blog",
      element: <Blogmain />,
    },
    {
      path: "add-blog",
      element: <Addblog />,
    },
    {
      path: "add-blog/:id",
      element: <Addblog />,
    },
    {
      path: "gallery",
      element: <Gallery />,
    },
    {
      path: "gallery/:id",
      element: <Gallery />,
    },
    {
      path: "album",
      element: <Albummain />,
    },
    {
      path: "add-album",
      element: <Addalbum />,
    },
    {
      path: "sale",
      element: <Salemain />,
    },
    {
      path: "add-sale",
      element: <Addsale />,
    },
    {
      path: "add-sale/:id",
      element: <Addsale />,
    },
    {
      path: "stock",
      element: <Stockmain />,
    },
    {
      path: "add-stock",
      element: <Addstock />,
    },
    {
      path: "add-stock/:id",
      element: <Addstock />,
    },
    {
      path: "item",
      element: <Itemmain />,
    },
    {
      path: "add-item",
      element: <Additem />,
    },
    {
      path: "add-item/:id",
      element: <Additem />,
    },
  ],
};

export default MainRoutes;
