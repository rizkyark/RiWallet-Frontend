import React, { useState } from "react";
import Layout from "../../layout/auth";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import Router from "next/router";
import Link from "next/link";

export default function Forgot() {
  const [form, setForm] = useState({
    email: "",
    linkDirect: "https://zazzpay.netlify.app/auth",
  });
  const [isError, setIsError] = useState(false);

  console.log(form);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/auth/forgot-password", form);
      console.log(result);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <Layout
      head="Forgot Password"
      title="Forgot Password"
      subTitle="Enter your RiWallet e-mail so we can send
      you a password reset link."
      dTitle="Enter your RiWallet e-mail so we can send
      you a password reset link."
      dSubTitle="To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens."
    >
      <form className="mt-5" onSubmit={handleSubmit}>
        <div
          className={`input-group my-5  border-bottom ${
            !isError ? (form.email ? "border-primary" : "") : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50"
            id="basic-addon1"
          >
            <i
              className={`bi bi-envelope fs-3 ${
                !isError ? (form.email ? "textMain" : "") : "text-danger"
              } `}
            ></i>
          </span>
          <input
            type="text"
            className="form-control border-0 fs-5"
            placeholder="Enter your e-mail"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="email"
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            value={form.email}
            required
          />
        </div>

        <p className=" text-danger mt-5">{isError ? "Email Invalid" : ""}</p>
        <button className="btn-lg w-100 bgMain mt-5">Confirm</button>
      </form>
    </Layout>
  );
}
