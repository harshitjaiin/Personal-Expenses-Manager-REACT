import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext"

export function AddBudgetModal({show , handleClose}){
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()
    function handleSubmit(e){
        e.preventDefault();
        const data = {
        name:nameRef.current.value,
        max:maxRef.current.value
        }

        addBudget(data)
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Max Spending</Form.Label>
                        <Form.Control type="number" ref={maxRef} required min={1} step={1}></Form.Control>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}