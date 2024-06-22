import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";

export function AddExpenseModal({show , handleClose , defaultBudgetId}){
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense , budgets} = useBudgets();

    function handleSubmit(e){
        e.preventDefault();

        const data = {
        desc:descriptionRef.current.value,
        amount:amountRef.current.value,
        budgetId:budgetIdRef.current.value
        }

        addExpense(data)
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" ref={amountRef} required min={1} step={1}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                        defaultValue={defaultBudgetId}
                        ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>  
                            {budgets.map( budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}