import classes from "./Modal.module.css";

import ReactDOM from "react-dom";
import React from "react";
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  const overlayPortalEl = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        overlayPortalEl
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayPortalEl
      )}
    </React.Fragment>
  );
};

export default Modal;
