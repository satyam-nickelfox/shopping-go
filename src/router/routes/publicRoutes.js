// Export all the public routes

import Login from "../../pages/public/login";
import SignUp from "../../pages/public/signup";
export const PublicRoutes = [
  { path: "/login", exact: true, component: Login },
  { path: "/signup", exact: true, component: SignUp },
];
