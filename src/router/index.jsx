import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes";
import PublicWrapper from "../hoc/PublicWrapper";
import AuthWrapper from "../hoc/AuthWrapper";
import { useIsLoggedIn,useUserDetail } from "../hooks/state";
const AppRouter = () => {
  const user = useUserDetail()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* All the public routes */}
          {PublicRoutes.map((route) => (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={<PublicWrapper {...route} />}
            />
          ))}
          {PrivateRoutes.map((route) => (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={<AuthWrapper {...route} userDetail={user} />}
            />
          ))}
          {/* All the private routes */}

          {/* 404 page route */}
          {/* <Route exact path="*" element={<Error404 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
