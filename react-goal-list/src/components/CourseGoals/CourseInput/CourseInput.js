import React, { useState } from "react";
import styled from "styled-components";

import Button from "../../UI/Button/Button";
//import "./CourseInput.css";

const FormInput = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.invalid ? 'red' : 'white'};
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
    background-color: ${props => props.invalid ? '#ff8a8a' : 'none'}
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  // &.invalid input {
  //   background-color: #ff8a8a;
  //   border-color: red;
  // }

  // &.invalid label {
  //   color: red;
  // }
`;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [validInput, setValidInput] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setValidInput(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.length === 0) {
      setValidInput(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <FormInput className={!validInput && 'invalid'}>
  //       <label>Course Goal</label>
  //       <input type="text" onChange={goalInputChangeHandler} />
  //     </FormInput>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );
  return (
    <form onSubmit={formSubmitHandler}>
      <FormInput invalid={!validInput}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </FormInput>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
