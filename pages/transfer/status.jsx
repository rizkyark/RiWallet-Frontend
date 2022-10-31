import React, { useState } from "react";
import Layout from "../../layout/main";
import Card from "../../components/Card/transaction";
import { useDispatch } from "react-redux";
import { exportTransaction, transfer } from "stores/action/transaction";
import { useRouter } from "next/router";

export default function Confirmation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const { query } = useRouter();
  const [toast, setToast] = useState(false);
  const toggleToast = () => setToast(!toast);
  console.log(query);

  const handleSubmit = () => {
    const data = {
      receiverId: query.receiverId,
      amount: query.amount,
      notes: query.notes,
    };
    console.log(data);
    dispatch(transfer(data))
      .then((res) => alert("success"))
      .catch((err) => alert(err));
  };

  return (
    <Layout page="transfer">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <div
          className={`text-center my-5 ${
            query.status == "success" ? "d-block" : "d-none"
          }`}
        >
          <h1 className="bi bi-check-circle-fill text-success"></h1>
          <p>Transfer Success</p>
        </div>

        <div
          className={`text-center my-5 ${
            query.status == "failed" ? "d-block" : "d-none"
          }`}
        >
          <h1 className="bi bi-x-circle-fill text-danger"></h1>
          <p>Transfer Failed</p>
          <p className="text-black-50">
            We can`t transfer your money at the moment, we recommend you to
            check your internet connection and try again.
          </p>
        </div>
        <p className="my-3">Details</p>
        <div className="mt-3 px-0">
          <div className={` bg-white rounder shadow-sm`}>
            <div className="row p-3 py-2 ">
              <div className="col-12">
                <p className="mb-1 fw-light">Amount</p>
                <h6 className="fw-bold">
                  Rp.{Number(query.amount).toLocaleString()}{" "}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-0">
          <div className={` bg-white rounder shadow-sm`}>
            <div className="row p-3 py-2">
              <div className="col-12">
                <p className="mb-1 fw-light">Balance Left</p>
                <h6 className="fw-bold">
                  Rp.{Number(query.balanceLeft).toLocaleString()}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-0">
          <div className={` bg-white rounder shadow-sm`}>
            <div className="row p-3 py-2">
              <div className="col-12">
                <p className="mb-1 fw-light">Date & Time</p>
                <h6 className="fw-bold">{query.date.slice(0, 21)} </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-0">
          <div className={` bg-white rounder shadow-sm`}>
            <div className="row p-3 py-2">
              <div className="col-12">
                <p className="mb-1 fw-light">notes</p>
                <h6 className="fw-bold">{query.notes} </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="">
            <p>Transfer To</p>
          </div>
          <div className="rounder w-auto">
            <div>
              <Card
                leftTop={`${query.firstName} ${query.lastName}`}
                leftBottom={`${query.noTelp}`}
                right={``}
                image={`${query.image}`}
                className="mt-3 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="text-end mt-5 me-3 d-flex flex-column d-lg-block">
          {query.status == "success" ? (
            <>
              <button
                className="btn btn-lg bg-light textMain me-lg-3 mb-3 mb-lg-0"
                onClick={() => router.push("/home")}
              >
                <i className="bi bi-download me-3"></i>
                Download PDF
              </button>

              <button
                className="btn btn-lg bgMain "
                onClick={() => router.push("/home")}
              >
                Back to Home
              </button>
            </>
          ) : (
            <button
              className="btn btn-lg bgMain "
              onClick={() => router.back()}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
