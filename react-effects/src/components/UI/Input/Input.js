import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const inputReference = useRef();
  const setFocus = () => {
    inputReference.current?.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      keepFocus: setFocus,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.title}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputReference}
      />
    </div>
  );
});

export default Input;
