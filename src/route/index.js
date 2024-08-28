import { createBrowserRouter } from "react-router-dom";
import MainWeb from "../modules/Main";
import HomeUser from "../modules/user/home/HomeUser";
import ProductUser from "../modules/user/product/ProductUser";
import Login from "../modules/user/auth/login/Login";
import Signup from "../modules/user/auth/signup/Signup";
import Sale from "../modules/user/sale/Sale";
import FlatRate from "../modules/user/flatRate/FlatRate";
import Collection from "../modules/user/collection/Collection";
import StoreSystem from "../modules/user/storeSystem/StoreSystem";
import LayoutAdmin from "../modules/admin/layout/LayoutAdmin";
import Admin from "../modules/admin/home/HomeAdmin";
import ProductAdmin from "../modules/admin/product/ProductAdmin";
import CreateProduct from "../modules/admin/product/addProduct/AddProduct";

const AppRoute = (role, isAuth) => {
  const route = [
    {
      path: "/",
      element: <MainWeb />,
      children: [
        { index: true, element: <HomeUser /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "sale",
          element: <Sale />,
        },
        {
          path: "flatRate",
          element: <FlatRate />,
        },
        {
          path: "product",
          element: <ProductUser />,
        },
        {
          path: "collection",
          element: <Collection />,
        },
        {
          path: "StoreSystem",
          element: <StoreSystem />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        { index: true, element: <Admin /> },
        {
          path: "product",
          element: <ProductAdmin />,
        },
        {
          path: "create-product",
          element: <CreateProduct />,
        },
      ],
    },
  ];
  return createBrowserRouter(route);
};
export default AppRoute;
