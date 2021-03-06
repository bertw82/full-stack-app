import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  // higher-order-component for private routes
  return (
    <Route
      {...rest}
      render={(props) => 
        rest.authenticatedUser ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
