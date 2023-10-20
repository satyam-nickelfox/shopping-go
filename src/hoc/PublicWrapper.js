import React from "react";
import PublicLayout from "../layout/publicLayout";
import { useIsLoggedIn,useUserDetail } from "../hooks/state";
import { Navigate } from "react-router-dom";
const PublicWrapper = ({ component: Component }) => {
  const isLoggedIn = useIsLoggedIn();
  const user = useUserDetail();
  const Wrapper = (props) => {
    if (isLoggedIn) {
      if(user?.role === "user"){
        return <Navigate to="/user/dashboard" />;
      }
      else {
        return <Navigate to="/admin/dashboard" />;
      }
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
