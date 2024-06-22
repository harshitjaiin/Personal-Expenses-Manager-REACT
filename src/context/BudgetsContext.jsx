import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ desc, amount, budgetId }) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: uuidV4(),
        desc,
        amount : parseInt(amount),
        budgetId,
      },
    ]);
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [
        ...prevBudgets,
        {
          id: uuidV4(),
          name,
          max : parseInt(max),
        },
      ];
    });
  }

  function deleteBudget({ id }) {
    setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
