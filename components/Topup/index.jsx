import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Topup(props) {
  const [amount, setAmount] = useState(0);

  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter">Topup </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <h6 className="text-black-50">
          Enter the amount of money, and click submit
        </h6>
        <div className="d-flex justify-content-center">
          <Form.Control
            type="number"
            size=""
            placeholder="_____________________________"
            className="text-center pt-3 text-black-50 fs-3 my-5 underlineInput"
            onChange={({ target }) => setAmount(target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={() => props.submit(amount)} className="p-2 px-4">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
