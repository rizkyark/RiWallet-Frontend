import React, { useState } from "react";
import Layout from "layout/main";
import Card from "components/Card/transaction";
import { useDispatch } from "react-redux";
import { transfer } from "stores/action/transaction";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Pin from "react-pin-field";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import { checkPin } from "stores/action/user";

export default function Confirmation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const { query } = useRouter();
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);
  console.log(query);

  const handleSubmit = () => {
    const data = {
      receiverId: query.receiverId,
      amount: query.amount,
      notes: query.notes,
    };
    console.log(data);
    dispatch(transfer(data))
      .then((res) => {
        router.push({
          pathname: "/transfer/status",
          query: {
            ...query,
            transactionId: res.value.data.data?.id,
            status: "success",
          },
        });
      })
      .catch((err) => {
        router.push({
          pathname: "/transfer/status",
          query: {
            ...query,
            status: "failed",
          },
        });
      });
  };

  return (
    <Layout page="transfer">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <div className="">
          <div className="">
            <p>Transfer To</p>
          </div>
          <div className="rounder w-auto">
            <div>
              <Card
                leftTop={`${query.firstName} ${query.lastName}`}
                leftBottom={`${query.noTelp}`}
                right={``}
                image={`${query.image}`}
                className="mt-3 shadow-sm"
              />
            </div>
          </div>

          <p className="my-3">Details</p>
          <div className="mt-3 px-0">
            <div className={` bg-white rounder shadow-sm`}>
              <div className="row p-3">
                <div className="col-12">
                  <p className="mb-1 fw-light">Amount</p>
                  <h6 className="fw-bold">
                    Rp.{Number(query.amount).toLocaleString()}{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-0">
            <div className={` bg-white rounder shadow-sm`}>
              <div className="row p-3">
                <div className="col-12">
                  <p className="mb-1 fw-light">Balance Left</p>
                  <h6 className="fw-bold">
                    Rp.{Number(query.balanceLeft).toLocaleString()}
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-0">
            <div className={` bg-white rounder shadow-sm`}>
              <div className="row p-3">
                <div className="col-12">
                  <p className="mb-1 fw-light">Date & Time</p>
                  <h6 className="fw-bold">{query.date.slice(0, 21)} </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-0">
            <div className={` bg-white rounder shadow-sm`}>
              <div className="row p-3">
                <div className="col-12">
                  <p className="mb-1 fw-light">notes</p>
                  <h6 className="fw-bold">{query.notes} </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-end mt-3 me-3">
          <button
            className="btn btn-lg bgMain "
            onClick={() => setModalShow(true)}
          >
            Continue
          </button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            confirm={(code) =>
              dispatch(checkPin(code))
                .then((res) => handleSubmit())
                .catch((err) => toggleToast())
            }
          />
        </div>
      </div>
      <ToastContainer
        className="p-3"
        position={"top-end"}
        style={{ zIndex: "5000" }}
      >
        <Toast
          onClose={toggleToast}
          show={toast}
          animation={true}
          bg={"danger"}
        >
          <Toast.Header>
            <strong className="me-auto">Pin Wrong</strong>
          </Toast.Header>
          <Toast.Body>Please enter the correct pin</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

function MyVerticallyCenteredModal(props) {
  const [pin, setPin] = useState("");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter">
          Enter PIN to Transfer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <h6 className="text-black-50">
          Enter your 6 digits PIN for confirmation to continue transferring
          money.
        </h6>
        <div className="d-flex justify-content-center">
          <Pin
            className={`btn btn-lg border col-1 text-black p-0 py-2 my-5 me-3 me-lg-2 pin ${
              pin.length == 6 ? "border-primary" : ""
            }`}
            length={6}
            validate="0123456789"
            inputMode="numeric"
            onChange={(code) => setPin(code)}
            autoFocus
          ></Pin>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={() => props.confirm(pin)}
          disabled={pin.length == 6 ? false : true}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
