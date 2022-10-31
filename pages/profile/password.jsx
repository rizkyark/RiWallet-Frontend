import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import { useDispatch, useSelector } from "react-redux";
import { getUser, changePassword } from "stores/action/user";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Password() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [msg, setMsg] = useState("");
  const user = useSelector((state) => state.user);
  const { data } = user;

  const [input, setInput] = useState(0);
  console.log(input);
  useEffect(() => {
    getData();
  }, []);

  const handleChangeForm = ({ target }) => {
    console.log(target.name);
    setForm({ ...form, [target.name]: target.value });
  };
  console.log(form);
  const getData = () => {
    try {
      dispatch(getUser(Cookie.get("id")))
        .then((res) => console.log(res.value.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    dispatch(changePassword(Cookie.get("id"), form))
      .then((res) => {
        console.log(res.value.data.msg);
        setIsError(false);
        setMsg(res.value.data.msg);
      })
      .catch((err) => {
        setIsError(true);
        setMsg(err.response.data.msg);
        console.log(err.response);
      });
  };

  return (
    <Layout page="Profile" head="Profile">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <h3 className="my-3">Change Password</h3>
        <h5 className="text-black-50 col-12 col-lg-6">
          You must enter your current password and then type your new password
          twice.
        </h5>
        <div className="mt-5 col-12 col-lg-6 container text-start">
          <div
            className={`input-group border-0 border-bottom mt-lg-5 ${
              !isError
                ? form.oldPassword
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
                    ? form.oldPassword
                      ? "textMain"
                      : ""
                    : "text-danger"
                }`}
              ></i>
            </span>
            <input
              type={isVisible.oldPassword ? "text" : "password"}
              className="form-control border-0 fs-5"
              placeholder="Current password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="oldPassword"
              onChange={(event) => handleChangeForm(event)}
              value={form.password}
              required
            />
            <span
              className="input-group-text bg-white border-0 text-black-50 fs-3"
              onClick={() =>
                setIsVisible({
                  ...isVisible,
                  oldPassword: !isVisible.oldPassword,
                })
              }
            >
              {isVisible.oldPassword ? (
                <i className={`bi bi-eye-slash `}></i>
              ) : (
                <i className={`bi bi-eye `}></i>
              )}
            </span>
          </div>
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
                  !isError
                    ? form.newPassword
                      ? "textMain"
                      : ""
                    : "text-danger"
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
            className={`input-group border-0 border-bottom mt-lg-5 ${
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
          <button
            className="btn btn-lg bgMain w-100 mt-5"
            onClick={handleSubmit}
            disabled={
              !(form.confirmPassword && form.newPassword && form.oldPassword)
            }
          >
            Change Password
          </button>
        </div>
      </div>
    </Layout>
  );
}
