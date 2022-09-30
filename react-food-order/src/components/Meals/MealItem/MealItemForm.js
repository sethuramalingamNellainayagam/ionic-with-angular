import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitMealItemHandler = (event) => {
    event.preventDefault();
    const amountRefValue = +amountRef.current.value;

    if (
      amountRefValue.length === 0 ||
      amountRefValue < 1 ||
      amountRefValue > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddCartItem(amountRefValue);
  };
  return (
    <form className={classes.form} onSubmit={submitMealItemHandler}>
      <Input
        ref={amountRef}
        label="amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount! 1-5.</p>}
    </form>
  );
};

export default MealItemForm;
