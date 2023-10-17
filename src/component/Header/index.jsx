import React from "react";
import { useCookies } from "react-cookie";
import { CookieKeys, CookieOptions } from "../../constants/cookieKeys";
function Header() {
  const [cookies, setCookie, removeCookie] = useCookies([CookieKeys.Auth]);

  const handleLogout = () => {
    const cookieNames = Object.keys(cookies);
    cookieNames.forEach((cookie) => {
      removeCookie(cookie, CookieOptions);
    });
  };
  return (
    // <div className='flex justify-between w-full p-7 bg-blue-200'>
    //   <div className=''>Shopping Go</div>
    //   <div>
    //     User
    //   </div>
    // </div>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Shopping App</div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-red-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
