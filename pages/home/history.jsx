import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import Card from "components/Card/transaction";
import { histoy } from "stores/action/transaction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";

export default function History() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dataHistory, setDataHistory] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    filter: "",
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pagination]);

  const getData = () => {
    try {
      dispatch(histoy(pagination))
        .then((res) => setDataHistory(res.value.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout head="History" page="dashboard">
      <div className="bgMain m-0 pt-4 rounder-bottom d-lg-none">
        <p
          className="btn btn-light bgMain text-start ps-0"
          onClick={() => router.back()}
        >
          <i className="bi bi-arrow-left me-2"></i> History
        </p>
      </div>
      <div className="col-12 " style={{ maxHeight: "inherit" }}>
        <div
          className="transaction-card rounder py-3 overflow-auto"
          style={{ maxHeight: "inherit", height: "100vh" }}
        >
          <div className="row ps-3 mt-3 d-none w-100 d-lg-flex">
            <p className="col-6 ">Transaction History</p>
            <div className="col-6 text-end">
              <div className="col-4 ms-auto">
                <Form.Select
                  size="lg"
                  onChange={(event) =>
                    setPagination({ ...pagination, filter: event.target.value })
                  }
                >
                  <option value={""}>Filter</option>
                  <option value={"WEEK"}>Week</option>
                  <option value={"MONTH"}>Month</option>
                  <option value={"YEAR"}>Year</option>
                </Form.Select>
              </div>
            </div>
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
        <div className="d-block d-lg-none my-5"></div>
      </div>
    </Layout>
  );
}
