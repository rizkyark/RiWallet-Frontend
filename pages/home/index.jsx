import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "layout/main";
import Card from "components/Card/transaction";
import Topup from "components/Topup";
import Cookies from "js-cookie";
import { getUser, dashboard } from "stores/action/user";
import { histoy, topup } from "stores/action/transaction";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [dataDashboard, setDataDashboard] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      dispatch(getUser(Cookies.get("id")))
        .then((res) => setUser(res.value.data.data))
        .catch((err) => console.log(err));

      dispatch(dashboard(Cookies.get("id")))
        .then((res) => setDataDashboard(res.value.data.data))
        .catch((err) => console.log(err));

      dispatch(histoy({ page: 1, limit: 4, filter: "" }))
        .then((res) => setDataHistory(res.value.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const datasets = dataDashboard.listIncome?.map((v, i) => {
    return Object.keys(v).reduce((obj, key) => {
      obj[key] = v[key] - dataDashboard.listExpense[i][key];
      return obj;
    }, {});
  });

  const data = {
    labels: Array(dataDashboard.listExpense)
      ? dataDashboard.listExpense?.map((v) => v.day.slice(0, 3))
      : [],
    datasets: [
      {
        label: "Total",
        data: datasets?.map((v) => v.total),
        backgroundColor: "#6379F4",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    plugins: {},
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return "Rp." + value.toLocaleString();
          },
          color: "#999999",
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#999999",
          padding: 20,
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)",
        },
      },
    },
    layout: {
      padding: {
        top: 50,
      },
    },
  };

  return (
    <Layout head="Dashboard" page="dashboard">
      <div className="rounder-bottom bgMain py-3 ">
        <div className="row p-lg-0 m-lg-0 ">
          <div
            className="col-3 mt-4 ms-2 d-block d-lg-none"
            style={{
              height: "52px",
              width: "52px",
              position: "relative",
            }}
          >
            <Image src="/Group 57.png" alt="" layout="fill" />
          </div>
          <div className="col-6 col-lg-9  mt-3 mb-3">
            <p className="mb-1 fw-light">Balance</p>
            <h3 className="fw-bold">
              Rp.{user.balance?.toLocaleString("id") || 0}
            </h3>
          </div>
          <div className="col-3  text-end mt-4 mt-lg-0 ">
            <i className="bi bi-bell fs-1 d-block d-lg-none"></i>

            <button
              className="d-none d-lg-block btn btn-lg btn-light w-100 rounder"
              onClick={() => router.push("/transfer")}
            >
              <span className="fs-3 text-secondary">&uarr;</span>
              &nbsp; Transfer
            </button>
            <button
              className="d-none d-lg-block btn btn-lg border-white bg-light w-100 mt-3 rounder"
              onClick={() => setModalShow(true)}
            >
              <i className="bi bi-plus-lg fs-3 text-secondary"></i> Top Up
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 d-block d-lg-none">
        <button
          className="btn btn-lg btn-light me-4 "
          onClick={() => router.push("/transfer")}
        >
          <span className="fs-1 text-primary">&uarr;</span>
          &nbsp; Transfer
        </button>
        <button
          className="btn btn-lg btn-light"
          onClick={() => setModalShow(true)}
        >
          <i className="bi bi-plus-lg fs-1 text-primary"></i> Top Up
        </button>
      </div>

      <div
        className="col-7 bg-white shadow rounder mt-4 d-none d-lg-block "
        style={{ minHeight: "468px" }}
      >
        <div className="row p-3">
          <div className="col-6">
            <p className="m-0">
              <i className="bi bi-arrow-down-short fs-1 text-success"></i>
            </p>
            <p>Income</p>
            <h5>Rp.{dataDashboard.totalIncome?.toLocaleString() || 0}</h5>
          </div>
          <div className="col-6">
            <p className="m-0">
              <i className="bi bi-arrow-up-short fs-1 text-danger"></i>
            </p>
            <p>Expense</p>
            <h5>Rp.{dataDashboard.totalExpense?.toLocaleString() || 0}</h5>
          </div>
          <Bar options={options} data={data} />;
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-4 " style={{ minHeight: "468px" }}>
        <div
          className="transaction-card rounder pt-4 h-100"
          style={{ minHeight: "468px" }}
        >
          <div className="mx-3 px-2 d-flex justify-content-between">
            <p className=" ">Transaction History</p>
            <Link href={"home/history"} className="">
              See all
            </Link>
          </div>
          {dataHistory
            ? dataHistory.map((v) => (
                <div key={v.id} className="">
                  <Card
                    leftTop={`${v.firstName} ${v.lastName}`}
                    leftBottom={`${v.type}`}
                    right={`${v.amount}`}
                    image={`${v.image}`}
                    type={v.type}
                    className={"mt-2 ps-2 cardItem"}
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
      <Topup
        show={modalShow}
        onHide={() => setModalShow(false)}
        submit={(amount) =>
          dispatch(topup({ amount }))
            .then(
              (res) => (window.location.href = res.value.data.data.redirectUrl)
            )
            .catch((err) => alert(err))
        }
      />
    </Layout>
  );
}

export default Home;
