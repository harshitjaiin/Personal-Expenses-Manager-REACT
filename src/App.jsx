import { Button, Container, Stack} from "react-bootstrap"
import {BudgetCards} from "./components/BudgetCards"
import { useState } from "react";
import  {UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetsContext";
import {AddBudgetModal } from "./components/AddBudgetModal"
import {AddExpenseModal } from "./components/AddExpenseModal"
import UncategorizedBudgetCard from "./components/UncategorizedButtonCard";
import {ViewExpensesModal} from "./components/viewExpenseModal";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal , setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal , setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(null);
  const [viewExpensesModalBudgetId , setViewExpensesModalBudgetId] = useState()
  const {budgets , getBudgetExpenses} = useBudgets() 

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
  <>
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={()=> setShowAddExpenseModal(true)}>Add Expense</Button>
      </Stack>
      <div style={{
        display:"grid" , 
        gridTemplateColumns:"repeat(auto-fill , minmax(300px , 1fr))" ,
        gap:"1rem" , 
        alignItems:"flex-start" ,
        }}>
          {budgets.map(budget=>{
            const amount = getBudgetExpenses(budget.id).reduce((total , expense)=> total + expense.amount , 0)
            return (
            <BudgetCards
            key={budget.id}
            name={budget.name} 
            amount={amount}
            max={budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
             >
             </BudgetCards>)
            })}
        
      <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
      onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
      ></UncategorizedBudgetCard>
      <TotalBudgetCard></TotalBudgetCard>
      </div>
    </Container>

    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}></AddBudgetModal>
    <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)}></AddExpenseModal>
    <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()}></ViewExpensesModal>
    </>
  )
}

export default App
