import React, { useContext } from "react";
import AuthContextStore from "../../ContextStore/AuthContextStore";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const contextData = useContext(AuthContextStore);
  return (
    // <AuthContextStore.Consumer>
    // {(contextData) => {
    // return (
    <nav className={classes.nav}>
      <ul>
        {contextData.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {contextData.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {contextData.isLoggedIn && (
          <li>
            <button onClick={contextData.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    // );
    //   }}
    // </AuthContextStore.Consumer>
  );
};

export default Navigation;
