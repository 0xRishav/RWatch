import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute({ component, path, ...props }) {
  const { accessToken } = useContext(UserContext);
  const Component = component;
  return (
    <Route path={path} {...props}>
      {accessToken ? (
        <Component />
      ) : (
        <Redirect replace to={{ pathname: "/signin", state: { from: path } }} />
      )}
    </Route>
  );
}
