import React, { useState } from "react";
import Layout from "../../layout/auth";
import axios from "../../utils/axios";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Pin from "react-pin-field";

export default function Success() {
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log(`/user/pin/${router.query.id}`);
  return (
    <Layout
      head="PIN"
      title={
        <>
          <i
            className="bi bi-check-circle-fill text-success "
            style={{ fontSize: "100px" }}
          ></i>
          <h1 className="mt-3 fw-bold">PIN Successsfully Created</h1>
        </>
      }
      subTitle="Your PIN was successfully created and you can now access all the features in RiWallet. Login to your new account and start exploring!"
      dTitle={
        <>
          <i
            className="bi bi-check-circle-fill text-success "
            style={{ fontSize: "100px" }}
          ></i>
          <h1 className="mt-3 fw-bold">PIN Successsfully Created</h1>
        </>
      }
      dSubTitle="Your PIN was successfully created and you can now access all the features in RiWallet. Login to your new account and start exploring!"
    >
      <div className="mt-5 pt-5">
        <button
          className="btn btn-lg mt-5 bgMain w-100"
          onClick={() => router.push("/home")}
        >
          Go To Dashboard
        </button>
      </div>
    </Layout>
  );
}
