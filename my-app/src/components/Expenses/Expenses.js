import Card from "../UI/Card";
import ExpensesList from "../Expenses/ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import { React, useState } from "react";
import ExpensesChart from "./ExpensesChart";

export default function Expenses(props) {
  const [year, setPickedYear] = useState("2019");
  const onGettingYearPicked = (selectedYear) => {
    console.log(selectedYear, " selectedYear in parent");
    setPickedYear(selectedYear);
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === year;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selectedYear={year}
          getYearPicked={onGettingYearPicked}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList expenses={filteredExpenses} />
      </Card>
    </div>
  );
}
