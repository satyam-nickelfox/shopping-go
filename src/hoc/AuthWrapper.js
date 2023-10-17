import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/state"; 
import PrivateLayout from "../layout/privateLayout";

const AuthWrapper = ({ component: Component, userDetail, ...rest }) => {
  const isLoggedIn = useIsLoggedIn();

  const Wrapper = (props) => {
    if (rest.path === "/" && !isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (isLoggedIn) {
      // restrict route for subadmin based on permission
      return (
        <PrivateLayout {...props}>
          <Component {...props} />
        </PrivateLayout>
      );
    } else {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  };

  return <Wrapper />;
};

export default AuthWrapper;
