import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/state";
import PrivateLayout from "../layout/privateLayout";

const AuthWrapper = ({ component: Component, userDetail, ...rest }) => {
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = (props) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (rest.role !== userDetail?.role) {
      return <Navigate to={{ pathname: "/" }} />;
    }

    return (
      <PrivateLayout {...props}>
        <Component {...props} />
      </PrivateLayout>
    );
  };

  return <Wrapper />;
};

export default AuthWrapper;
