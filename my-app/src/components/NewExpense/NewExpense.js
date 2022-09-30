import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);
  let formContent;
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    console.log(expenseData, " expenseData in new expense");
    props.onAddExpense(expenseData);
    stopShowFormOnCancel();
  };

  const showExpenseFormHandler = () => {
    setShowForm(true);
  };

  const stopShowFormOnCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    formContent = (
      <ExpenseForm
        onSaveExpenseData={saveExpenseDataHandler}
        onCancellingForm={stopShowFormOnCancel}
      />
    );
  } else {
    formContent = (
      <button onClick={showExpenseFormHandler}>Add New Expense</button>
    );
  }
  return <div className="new-expense">{formContent}</div>;
};

export default NewExpense;
