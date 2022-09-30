import { useRef, useState } from "react";
import FragmentWrapper from "../helpers/FragmentWrapper";
import Button from "../ui/Button";
import Card from "../ui/Card";
import ErrorModal from "../ui/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setAge] = useState("");
  const [isError, setIsError] = useState();
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const onEnterUsername = (event) => {
  //   setEnteredUserName(event.target.value);
  // };
  // const onEnterAge = (event) => {
  //   setAge(event.target.value);
  // };
  const dismissModalClickHandler = () => {
    setIsError(null);
  };
  const onAddUserSubmit = (event) => {
    event.preventDefault();
    const enteredRefName = nameInputRef.current.value;
    const enteredRefAge = ageInputRef.current.value;
    if (
      enteredRefName.trim().length === 0 ||
      enteredRefAge.trim().length === 0 ||
      +enteredRefAge < 0
    ) {
      setIsError({
        title: "Invalid inputs",
        errMessage: "Please enter valid inputs!",
      });
      return;
    }
    props.onGetUserList(enteredRefName, enteredRefAge);
    // setEnteredUserName("");
    // setAge("");
    enteredRefName.current.value = "";
    enteredRefAge.current.value = "";
  };
  return (
    <FragmentWrapper>
      {isError && (
        <ErrorModal
          title={isError.title}
          errMessage={isError.errMessage}
          dismissModalClickHandler={dismissModalClickHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={onAddUserSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age in years</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </FragmentWrapper>
  );
};

export default AddUser;
