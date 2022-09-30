import React from "react";
import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";
import ReactDom from "react-dom";

const BackDrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.dismissModalClickHandler}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.errMessage}</p>
      </div>
      <footer className={classes.actions}>
        <Button onButtonClick={props.dismissModalClickHandler}>Okay</Button>
      </footer>
    </Card>
  );
};
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <BackDrop dismissModalClickHandler={props.dismissModalClickHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          title={props.title}
          errMessage={props.errMessage}
          dismissModalClickHandler={props.dismissModalClickHandler}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
