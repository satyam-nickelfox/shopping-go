import Dashboard from "../../pages/private/user/dashboard";
import Success from "../../pages/private/product/success";
import Failed from "../../pages/private/product/fail";
export const PrivateRoutes = [
  { path: "/user/dashboard", exact: true, component: Dashboard },
  { path: "/user/product/success", exact: true, component: Success },
  { path: "/user/product/fail", exact: true, component: Failed },
];