import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import { useDispatch, useSelector } from "react-redux";
import { getUser, changePhone } from "stores/action/user";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Phone() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);
  const { data } = user;

  const [input, setInput] = useState(0);
  console.log(input);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      dispatch(getUser(Cookie.get("id")))
        .then((res) => console.log(res.value.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const editPhone = async () => {
    try {
      dispatch(changePhone(Cookie.get("id"), input)).then(
        router.push("/profile"),
        getData()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout page="Profile" head="Profile">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <div className="">
          <div className="">
            <h4>Edit Phone Number</h4>
          </div>
          <div className="rounder w-auto">
            <div>
              <p className="mt-5 col-12 col-lg-6 text-black-50">
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </p>
              <div className="text-center container row">
                <dir className="col-12 col-lg-6 mx-auto mt-5">
                  <div
                    className={` mx-auto text-center input-group my-5  border-bottom opacity-50 
                    ${input ? "border-primary" : ""}`}
                  >
                    <span
                      className={`input-group-text border-0 bg-white ps-0 text-black-50 }`}
                      id="basic-addon1"
                    >
                      <i
                        className={`bi bi-telephone fs-3 me-2 ${
                          input ? "textMain" : ""
                        }`}
                      ></i>
                      +62
                    </span>
                    <input
                      type="number"
                      className="form-control border-0 fs-5"
                      placeholder="Enter your phone number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="num"
                      onChange={(event) => setInput(event.target.value)}
                    />
                  </div>
                  <div className="">
                    <button
                      className={`btn btn-lg w-100 ${
                        input ? "bgMain" : "bg-light"
                      } `}
                      disabled={!input ? true : false}
                      // onClick={() =>
                      //   dispatch(changePhone(Cookie.get("id"), input))
                      // }
                      onClick={editPhone}
                    >
                      Edit Phone Number
                    </button>
                  </div>
                </dir>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
