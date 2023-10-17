import React from "react";
import PublicLayout from "../layout/publicLayout";
import { useIsLoggedIn } from "../hooks/state";
import { Navigate } from "react-router-dom";
const PublicWrapper = ({ component: Component }) => {
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = (props) => {
    if (isLoggedIn) {
      console.log("here");
      return <Navigate to="/user/dashboard" />;
    }

    return (
      <>
        <PublicLayout {...props}>
          <Component {...props} />
        </PublicLayout>
      </>
    );
  };

  return <Wrapper />;
};

export default PublicWrapper;
