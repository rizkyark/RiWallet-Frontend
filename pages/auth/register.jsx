import Link from "next/link";
import React from "react";
import { useState } from "react";
import Layout from "../../layout/auth";
import axios from "utils/axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangeForm = ({ target: { name, value } }) => {
    console.log(name);
    setForm({ ...form, [name]: value });
  };
  console.log(form);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/auth/register", form);
      console.log(result);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <Layout
      head="Sign Up"
      title="Sign Up"
      subTitle="Create your account to access RiWallet."
      dTitle="Start Accessing Banking Needs With All Devices and All
    Platforms With 30.000+ Users"
      dSubTitle="Transfering money is eassier than ever, you can access RiWallet
      wherever you are. Desktop, laptop, mobile phone? we cover all
      of that for you!"
    >
      <form className="mt-5" onSubmit={handleSubmit}>
        <div
          className={`input-group my-4  border-bottom ${
            !isError
              ? form.firstName
                ? "border-primary"
                : ""
              : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50"
            id="basic-addon1"
          >
            <i
              className={`bi bi-person fs-3 ${
                !isError ? (form.firstName ? "textMain" : "") : "text-danger"
              }`}
            ></i>
          </span>
          <input
            type="text"
            className="form-control border-0 fs-6"
            placeholder="Enter your firstname"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="firstName"
            onChange={(event) => handleChangeForm(event)}
            required
          />
        </div>
        <div
          className={`input-group my-4  border-bottom ${
            !isError ? (form.lastName ? "border-primary" : "") : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50"
            id="basic-addon1"
          >
            <i
              className={`bi bi-person fs-3 ${
                !isError ? (form.lastName ? "textMain" : "") : "text-danger"
              }`}
            ></i>
          </span>
          <input
            type="text"
            className="form-control border-0 fs-6"
            placeholder="Enter your lastname"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="lastName"
            onChange={(event) => handleChangeForm(event)}
            required
          />
        </div>
        <div
          className={`input-group my-4  border-bottom ${
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
              }`}
            ></i>
          </span>
          <input
            type="text"
            className="form-control border-0 fs-6"
            placeholder="Enter your e-mail"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="email"
            onChange={(event) => handleChangeForm(event)}
            required
          />
        </div>
        <div
          className={`input-group my-4  border-bottom ${
            !isError ? (form.password ? "border-primary" : "") : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50"
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
            className="form-control border-0 fs-6"
            placeholder="Enter your password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="password"
            onChange={(event) => handleChangeForm(event)}
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
        <button className="btn-lg w-100 bgMain">Sign Up</button>
        <p className="my-5  text-center">
          Already have an account? Let`s <Link href="/login">Sign In</Link>
        </p>
      </form>
    </Layout>
  );
}
