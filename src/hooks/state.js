import { useCookies } from "react-cookie";
import { CookieKeys } from "../constants/cookieKeys"; 
import { useSelector } from "react-redux";
// import { decodeToken } from 'react-jwt';
// custom hooks to get state stored in redux
export const useIsLoggedIn = () => {
  const [cookies] = useCookies([CookieKeys.Auth]);
  return cookies[CookieKeys.Auth] !== undefined;
};

export const useUserDetail = () => {
  const userDetail = useSelector((state) => state.app.user);
  const user = {
    userId: userDetail?._id,
    name: userDetail?.full_name,
    email: userDetail?.email,
    role : userDetail?.role
  };
  return user;
};
