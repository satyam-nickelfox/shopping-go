import Dashboard from "../../pages/private/user/dashboard";
import AdminDashboard from "../../pages/private/admin/dashboard";
import Success from "../../pages/private/product/success";
import Failed from "../../pages/private/product/fail";
export const PrivateRoutes = [
  { path: "/user/dashboard", exact: true, component: Dashboard, role: "user" },
  {
    path: "/user/product/success",
    exact: true,
    component: Success,
    role: "user",
  },
  { path: "/user/product/fail", exact: true, component: Failed, role: "user" },
  {
    path: "/admin/dashboard",
    exact: true,
    component: AdminDashboard,
    role: "admin",
  },
];
