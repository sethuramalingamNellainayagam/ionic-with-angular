import Expenses from "./components/Expenses/Expenses";
import "./App.css";
import NewExpense from "./components/NewExpense/NewExpense";
import React, { useState } from "react";

const INITITAL_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, SetExpenses] = useState(INITITAL_EXPENSES);

  const addExpenseHandler = (newExpense) => {
    console.log(newExpense, " new expense in app js");
    SetExpenses((prevSnapshot) => {
      return [newExpense, ...prevSnapshot];
    });
  };

  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Lets get started"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses}></Expenses>
    </div>
  );
}

export default App;
