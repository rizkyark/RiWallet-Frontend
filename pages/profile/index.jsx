import React, { useEffect} from "react";
import Layout from "layout/main";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  getUser,
  updateImage,
} from "stores/action/user";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookie from "js-cookie";
import Button from "react-bootstrap/Button";
import { logout } from "stores/action/auth";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { data } = user;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      dispatch(getUser(Cookie.get("id")))
        .then((res) => console.log(res.value.data.data))
        .catch((err) => console.log(err));
      console.log(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    dispatch(updateImage(Cookie.get("id"), formData)).then((res) => {
      router.push("/profile"), getData();
    });
  };

  const handleLogout = () => {
    dispatch(logout())
      .then((res) => {
        Cookie.remove("token");
        Cookie.remove("id");
        localStorage.clear();
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteImage(Cookie.get("id")))
      .then((res) => {
        alert("image deleted");
        getData();
      })
      .catch((err) => alert(err));
  };

  return (
    <Layout page="Profile" head="Profile">
      <div
        className="bg-white rounder shadow p-3 pb-5 overflow-auto text-center"
        style={{ maxHeight: "inherit", height: "100vh" }}
      >
        <div className="text-center">
          <DropdownButton
            variant=""
            title={
              <Image
                src={
                  data.image
                    ? `${process.env.URL_CLOUDINARY}${data.image}`
                    : `https://ui-avatars.com/api/?name=${
                        data.firstName + data.lastName
                      }&background=random&size=44&format=png`
                }
                width="100"
                height="100"
                alt=""
                className="visible"
              ></Image>
            }
            id="input-group-dropdown-1"
          >
            <Dropdown.Item className="text-center">
              <label htmlFor="imageInput" className="invisible ">
                <span className="visible" onClick={(e) => e.stopPropagation()}>
                  Edit
                </span>
              </label>
            </Dropdown.Item>
            <Dropdown.Item className="text-center">
              <span className="visible" onClick={(e) => handleDelete(e)}>
                Delete
              </span>
            </Dropdown.Item>
          </DropdownButton>

          <input
            type="file"
            accept="image/*"
            className="d-none"
            name="image"
            id="imageInput"
            onChange={(event) => handleImage(event)}
          />
        </div>
        <Button variant="" onClick={() => router.push("/profile")}>
          <i className="bi bi-pen me-2"></i>
          Edit
        </Button>
        <h3 className="my-3">
          {data.firstName} {data.lastName}
        </h3>
        <h5 className="text-black-50">{data.noTelp || "+00 000 000 000"}</h5>
        <div className="mt-5 col-lg-6 container text-start">
          <button
            className="btn btn-lg bg-light w-100 py- d-flex justify-content-between"
            onClick={() => router.push("/profile/info")}
          >
            Personal Information
            <i className="bi bi-arrow-right"></i>
          </button>
          <button
            className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4"
            onClick={() => router.push("/profile/password")}
          >
            Change Password
            <i className="bi bi-arrow-right"></i>
          </button>

          <button
            className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4"
            onClick={() => router.push("/profile/pin")}
          >
            Change PIN
            <i className="bi bi-arrow-right"></i>
          </button>

          <button
            className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}
