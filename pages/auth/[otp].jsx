import React, { useState } from "react";
import Layout from "../../layout/auth";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Reset() {
  const router = useRouter();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isVisible, setIsVisible] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isError, setIsError] = useState(false);

  const handleChangeForm = ({ target }) => {
    console.log(target.name);
    setForm({ ...form, [target.name]: target.value });
  };
  const [msg, setMsg] = useState("");

  console.log(form);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({
        ...form,
        keysChangePassword: router.query.otp,
      });
      const result = await axios.patch("/auth/reset-password", {
        ...form,
        keysChangePassword: router.query.otp,
      });
      console.log(result);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
      setIsError(true);
    }
  };

  return (
    <Layout
      head="Reset Password"
      title="Reset Password"
      subTitle="Create and confirm your new password so
      you can login to RiWallet."
      dTitle="Did You Forgot Your Password?
      Don’t Worry, You Can Reset Your
      Password In a Minutes.."
      dSubTitle="Now you can create a new password for your RiWallet account. Type your password twice so we can confirm your new passsword."
    >
      <form className="mt-5" onSubmit={handleSubmit}>
        <div
          className={`input-group border-0 border-bottom mt-lg-5 ${
            !isError
              ? form.newPassword
                ? "border-primary"
                : ""
              : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50 "
            id="basic-addon1"
          >
            <i
              className={`bi bi-lock fs-3 ${
                !isError ? (form.newPassword ? "textMain" : "") : "text-danger"
              }`}
            ></i>
          </span>
          <input
            type={isVisible.newPassword ? "text" : "password"}
            className="form-control border-0 fs-5"
            placeholder="New password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="newPassword"
            onChange={(event) => handleChangeForm(event)}
            value={form.newPassword}
            required
          />
          <span
            className="input-group-text bg-white border-0 text-black-50 fs-3"
            onClick={() =>
              setIsVisible({
                ...isVisible,
                newPassword: !isVisible.newPassword,
              })
            }
          >
            {isVisible.newPassword ? (
              <i className={`bi bi-eye-slash `}></i>
            ) : (
              <i className={`bi bi-eye `}></i>
            )}
          </span>
        </div>
        <div
          className={`input-group border-0 border-bottom mt-5 mt-lg-5 ${
            !isError
              ? form.confirmPassword
                ? "border-primary"
                : ""
              : "border-danger"
          }`}
        >
          <span
            className="input-group-text border-0 bg-white ps-0 text-black-50 "
            id="basic-addon1"
          >
            <i
              className={`bi bi-lock fs-3 ${
                !isError
                  ? form.confirmPassword
                    ? "textMain"
                    : ""
                  : "text-danger"
              }`}
            ></i>
          </span>
          <input
            type={isVisible.confirmPassword ? "text" : "password"}
            className="form-control border-0 fs-5"
            placeholder="Confirm password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="confirmPassword"
            onChange={(event) => handleChangeForm(event)}
            value={form.confirmPassword}
            required
          />
          <span
            className="input-group-text bg-white border-0 text-black-50 fs-3"
            onClick={() =>
              setIsVisible({
                ...isVisible,
                confirmPassword: !isVisible.confirmPassword,
              })
            }
          >
            {isVisible.confirmPassword ? (
              <i className={`bi bi-eye-slash `}></i>
            ) : (
              <i className={`bi bi-eye `}></i>
            )}
          </span>
        </div>
        <div className="mt-5 text-center">
          {msg ? (
            isError ? (
              <p className="text-danger">{msg}</p>
            ) : (
              <p className="text-primary">{msg}</p>
            )
          ) : (
            ""
          )}
        </div>
        <button className="btn-lg w-100 bgMain mt-5">Reset Password</button>
      </form>
    </Layout>
  );
}
