import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContextStore from "../../ContextStore/AuthContextStore";
import Input from "../UI/Input/Input";

const emailReduce = (lastState, action) => {
  // return new state
  if (action.type === "EMAIL_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: lastState.value, isValid: lastState.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const pwdReduce = (lastState, action) => {
  if (action.type === "PWD_CHANGE") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PWD_BLUR") {
    return {
      value: lastState.value,
      isValid: lastState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const emailReference = useRef();
  const pwdReference = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReduce, {
    value: "",
    isValid: null,
  });
  const [pwdState, dispatchPwd] = useReducer(pwdReduce, {
    value: "",
    inValid: null,
  });

  const { isValid: isValidOfEmailState } = emailState;
  const { isValid: isValidOfPwdState } = pwdState;
  const contextData = useContext(AuthContextStore);

  // useEffect(() => {
  //   const waitingTime = setTimeout(() => {
  //     console.log("checking form validaity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log("CLEAN UP");
  //     clearTimeout(waitingTime);
  //   };
  // }, [enteredEmail, enteredPassword]);
  useEffect(() => {
    const waitingTime = setTimeout(() => {
      console.log("checking form validaity");
      setFormIsValid(emailState.isValid && pwdState.isValid);
    }, 500);
    return () => {
      console.log("CLEAN UP");
      clearTimeout(waitingTime);
    };
  }, [isValidOfEmailState, isValidOfPwdState]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "EMAIL_INPUT", val: event.target.value });

    //setFormIsValid(emailState.isValid && pwdState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPwd({ type: "PWD_CHANGE", val: event.target.value });

    //setFormIsValid(emailState.isValid && pwdState.isValid);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPwd({ type: "PWD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      contextData.onLogin(emailState.value, pwdState.value);
    } else if (!isValidOfEmailState) {
      emailReference.current.keepFocus();
    } else if (!isValidOfPwdState) {
      pwdReference.current.keepFocus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          title="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={isValidOfEmailState}
          ref={emailReference}
        />
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input
          id="password"
          type="password"
          title="Password"
          value={pwdState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={isValidOfPwdState}
          ref={pwdReference}
        />
        {/* <div
          className={`${classes.control} ${
            pwdState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
