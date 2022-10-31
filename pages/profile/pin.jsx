import React, { useState } from "react";
import Layout from "layout/main";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Pin from "react-pin-field";
import { checkPin } from "stores/action/user";
import { ToastContainer, Toast } from "react-bootstrap";
import axios from "utils/axios";
import Cookie from "js-cookie";

export default function ChangePin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    msg1: "",
    msg2: "",
    bg: "",
  });
  const toggleToast = () =>
    setToast({ show: false, msg1: "", msg2: "", bg: "" });

  const awaitTimeout = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isChecked) {
        dispatch(checkPin(pin))
          .then((res) => {
            setIsChecked(true);
            setToast({
              show: true,
              msg1: "PIN CORRECT",
              msg2: "Enter your new PIN",
              bg: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            setToast({
              show: true,
              msg1: "Wrong PIN",
              msg2: "Please enter the correct pin",
              bg: "danger",
            });
          });
        setPin("");
      } else {
        const result = await axios.patch(`/user/pin/${Cookie.get("id")}`, {
          pin: Number(pin),
        });

        setToast({
          show: true,
          msg1: "Change PIN SUCCESS",
          msg2: "You can use your new PIN now",
          bg: "success",
        });
        setPin("");
        awaitTimeout(2500).then(() => router.push("/profile"));
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      setToast({
        show: true,
        msg1: error.response.status,
        msg2: error.response.statusText,
        bg: "danger",
      });
    }
  };

  return (
    <Layout page="Profile" head="Profile">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <h3 className="my-3">Change PIN</h3>
        <h5 className="text-black-50 col-12 col-lg-6">
          {isChecked
            ? "Type your new 6 digits security PIN to use in RiWallet."
            : "Enter your current 6 digits RiWallet PIN below to continue to the next steps."}
        </h5>
        <div className="mt-5 pt-5 col-12 col-lg-6 mx-auto text-start">
          <center className="mb-5 mt-5">
            <Pin
              className={`btn btn-lg border  text-black p-0 py-2 me-0 me-lg-2 pin ${
                pin.length == 6 ? "border-primary" : ""
              }`}
              style={{ width: "55px" }}
              length={6}
              validate="0123456789"
              inputMode="numeric"
              onChange={(code) => setPin(code)}
              autoFocus
            ></Pin>
          </center>
          <button
            className="btn btn-lg bgMain w-100 mt-5"
            onClick={handleSubmit}
            disabled={pin.length != 6}
          >
            {isChecked ? "Change Pin" : "Continue"}
          </button>
        </div>
      </div>
      <ToastContainer
        className="p-3"
        position={"top-end"}
        style={{ zIndex: "5000" }}
      >
        <Toast
          onClose={toggleToast}
          show={toast.show}
          animation={true}
          bg={toast.bg}
        >
          <Toast.Header>
            <strong className="me-auto">{toast.msg1}</strong>
          </Toast.Header>
          <Toast.Body>{toast.msg2}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}
