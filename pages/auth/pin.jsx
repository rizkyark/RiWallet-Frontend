import React, { useState } from "react";
import Layout from "../../layout/auth";
import axios from "../../utils/axios";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Pin from "react-pin-field";

export default function CreatePin() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(Number(pin));
      const result = await axios.patch(`/user/pin/${router.query.id}`, {
        pin: Number(pin),
      });
      console.log("object");
      console.log(result);
      router.push("/auth/success");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(`/user/pin/${router.query.id}`);
  return (
    <Layout
      head="PIN"
      title="Create Security PIN"
      subTitle="Create a PIN that`s contain 6 digits number for security purpose in RiWallet."
      dTitle="Secure Your Account, Your Wallet,
      and Your Data With 6 Digits PIN
      That You Created Yourself."
      dSubTitle="Create 6 digits pin to secure all your money and your data in RiWallet app. 
      Keep it secret and don`t tell anyone about your RiWallet account password and the PIN."
    >
      <div className="mb-5 mt-5 d-flex flex-row">
        <Pin
          className={`btn btn-lg border col-2 text-black p-0 py-2 me-0 me-lg-2 pin ${
            pin.length == 6 ? "border-primary" : ""
          }`}
          length={6}
          validate="0123456789"
          inputMode="numeric"
          onChange={(code) => setPin(code)}
          autoFocus
        ></Pin>
      </div>
      <button
        className="btn btn-lg mb-5 col-11 bgMain "
        onClick={handleSubmit}
        disabled={pin.length == 6 ? false : true}
      >
        Confirm
      </button>
    </Layout>
  );
}
