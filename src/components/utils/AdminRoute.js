import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAdmin()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/notfound",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
