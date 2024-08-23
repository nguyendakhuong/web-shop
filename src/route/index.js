import { createBrowserRouter } from "react-router-dom";
import MainWeb from "../modules/Main";
import HomeUser from "../modules/user/home/HomeUser";
import ProductUser from "../modules/user/product/ProductUser";

const AppRoute = (role, isAuth) => {
  const route = [
    {
      path: "/",
      element: <MainWeb />,
      children: [
        { index: true, element: <HomeUser /> },
        {
          path: "product",
          element: <ProductUser />,
        },
      ],
    },
  ];
  return createBrowserRouter(route);
};
export default AppRoute;
