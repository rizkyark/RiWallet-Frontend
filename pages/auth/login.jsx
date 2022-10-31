import React, { useState } from "react";
import Layout from "../../layout/auth";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import Router from "next/router";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangeForm = ({ target }) => {
    console.log(target.name);
    setIsError(false);
    setForm({ ...form, [target.name]: target.value });
  };
  console.log(form);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/auth/login", form);
      console.log(result.data.data.pin);
      Cookies.set("token", result.data.data.token);
      Cookies.set("id", result.data.data.id);
      if (result.data.data.pin) {
        Router.push("/home");
      } else {
        Router.push({
          pathname: "/create-pin",
          query: { id: result.data.data.id },
        });
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <Layout
      head="Login"
      title="Login"
      subTitle="Login to your existing account to access all the features in
    RiWallet."
      dTitle="Start Accessing Banking Needs With All Devices and All
    Platforms With 30.000+ Users"
      dSubTitle="Transfering money is eassier than ever, you can access RiWallet
      wherever you are. Desktop, laptop, mobile phone? we cover all
      of that for you!"
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
            onChange={(event) => handleChangeForm(event)}
            value={form.email}
            required
          />
        </div>
        <div
          className={`input-group border-0 border-bottom mt-lg-5 ${
            !isError ? (form.password ? "border-primary" : "") : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50 "
            id="basic-addon1"
          >
            <i
              className={`bi bi-lock fs-3 ${
                !isError ? (form.password ? "textMain" : "") : "text-danger"
              }`}
            ></i>
          </span>
          <input
            type={isVisible ? "text" : "password"}
            className="form-control border-0 fs-5"
            placeholder="Enter your password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="password"
            onChange={(event) => handleChangeForm(event)}
            value={form.password}
            required
          />
          <span
            className="input-group-text bg-white border-0 text-black-50 fs-3"
            onClick={() =>
              isVisible ? setIsVisible(false) : setIsVisible(true)
            }
          >
            {isVisible ? (
              <i className={`bi bi-eye-slash `}></i>
            ) : (
              <i className={`bi bi-eye `}></i>
            )}
          </span>
        </div>
        <div className="mt-3  text-end">
          <Link href={"/auth/forgot"} className="" color={""}>
            Forgot password ?
          </Link>
        </div>
        <p className=" text-danger my-4 my-lg-5 text-center">
          {isError ? "Email or Password Invalid" : ""}
        </p>
        <button className="btn-lg w-100 bgMain mt-">Login</button>
        <p className="my-5  text-center">
          Don`t have an account? Let`s <Link href="/register">Sign Up</Link>
        </p>
      </form>
    </Layout>
  );
}
