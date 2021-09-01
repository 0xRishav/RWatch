import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute({ component, path, ...props }) {
  const { isUserLoggedIn } = useContext(UserContext);
  const Component = component;
  return (
    <Route path={path} {...props}>
      {isUserLoggedIn ? (
        <Component />
      ) : (
        <Redirect replace to={{ pathname: "/signin", state: { from: path } }} />
      )}
    </Route>
  );
}
