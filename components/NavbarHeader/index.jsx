import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getUser } from "stores/action/user";
import Cookies from "js-cookie";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { histoy } from "stores/action/transaction";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    dispatch(getUser(Cookies.get("id")))
      .then((result) => {
        setUser(result.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(histoy({ page: 1, limit: 4, filter: "" }))
      .then((res) => setDataHistory(res.value.data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(dataHistory);
  return (
    <div>
      <div className="bg-white shadow-sm w-100 container-fluid py-4">
        <div className="container d-flex justify-content-between">
          <h3 className="textMain fw-bold mt-3">RiWallet</h3>
          <div className="row p-lg-0 m-lg-0 w-auto">
            <div
              className="col-3 ms-2 "
              style={{ height: "52px", width: "52px", position: "relative" }}
            >
              <Image
                src={
                  user.image
                    ? `${process.env.URL_CLOUDINARY}${user.image}`
                    : `https://ui-avatars.com/api/?name=${
                        user.firstName + user.lastName
                      }&background=random&size=44&format=png`
                }
                layout="fill"
                alt=""
                className="visible"
              ></Image>
            </div>
            <div className="col-6 col-lg-6 ">
              <h6 className="fw-bold">
                {user?.firstName} {user?.lastName}
              </h6>
              <p className="mb-1 fw-light">{user?.noTelp || "+00000000"}</p>
            </div>
            <div className="col-1">
              <DropdownButton
                variant=""
                title={<i className="bi bi-bell fs-4 d-block"></i>}
                id="input-group-dropdown-1"
              >
                {dataHistory
                  ? dataHistory.map((v) => (
                      <Dropdown.Item key={v.id}>
                        <div className="shadow-sm p-3 rounder d-flex">
                          {v.type == "send" ? (
                            <i className="bi bi-arrow-up me-4 fs-2 text-danger"></i>
                          ) : (
                            <i className="bi bi-arrow-down me-4 fs-2 text-success"></i>
                          )}
                          <div>
                            {v.type == "send" ? (
                              <span>Tranfer to {v.fullName} </span>
                            ) : v.type == "accept" ? (
                              <span>Accept from {v.fullName} </span>
                            ) : (
                              <span>Topup </span>
                            )}
                            <h5 className="fw-bold">Rp.{v.amount.toLocaleString()}</h5>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  : ""}
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
