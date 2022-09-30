import React, { useContext } from "react";
import AuthContextStore from "../../ContextStore/AuthContextStore";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  const contextData = useContext(AuthContextStore);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={contextData.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
