import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AdminRoute } from "./utils/AdminRoute";
import Auth from "./utils/Auth";

import Register from "./Register";
import Login from "./Login";
import Admin from "./Admin";
import Call from "./Call";
import Edit from "./Edit";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <AdminRoute exact path="/admin" component={Admin} />
      <ProtectedRoute exact path="/call" component={Call} />
      <ProtectedRoute exact path="/edit" component={Edit} />
      <Route exact path="/notfound" component={NotFound} />
      <Route
        exact
        path="/"
        {...(Auth.isAuthenticated() ? <Redirect to="/edit" /> : <Login />)}
      />
      <Route path="*">
        <Redirect to="/notfound" />
      </Route>
    </Switch>
  );
}
