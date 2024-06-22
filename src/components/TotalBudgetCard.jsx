import { useBudgets} from "../context/BudgetsContext";
import { BudgetCards } from "./BudgetCards";

export default function TotalBudgetCard(){
    const {expenses , budgets} = useBudgets()
    console.log(expenses);
    console.log(budgets);
    const amount = expenses.reduce((total , expense) => total+parseInt(expense.amount) , 0)
    const max = budgets.reduce((total , budget) => total+parseInt(budget.max) , 0)
    console.log(amount)
    console.log(max)
    if(max===0) return null

    return <BudgetCards amount={amount} name="Total" gray max={max} hideButtons />
}