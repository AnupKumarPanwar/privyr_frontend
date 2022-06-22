import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createWebhook } from "../services/createWebhook";

const CreateWebhook = ({ userId, show, handleClose, onCreate }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createWebhook(name, userId)
      .then((response) => {
        onCreate(response.data.data);
        handleClose();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create webhook</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name for webhook</Form.Label>
            <Form.Control
              value={name}
              type="text"
              autoFocus={true}
              autoComplete="false"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateWebhook;
