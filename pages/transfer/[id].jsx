import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import Card from "components/Card/transaction";
import { useDispatch } from "react-redux";
import { getUser } from "stores/action/user";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function TransferTo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const [toTransfer, setToTransfer] = useState({
    receiverId: query.id,
    amount: "",
    notes: "",
  });
  const [user, setUser] = useState({});
  console.log(user);

  console.log(query);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      dispatch(getUser(Cookies.get("id")))
        .then((res) => setUser(res.value.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    if (name == "amount" && +value <= user.balance) {
      setToTransfer({ ...toTransfer, [name]: value });
    }
    if (name !== "amount") {
      setToTransfer({ ...toTransfer, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/transfer/confirmation",
      query: {
        ...toTransfer,
        ...query,
        date: new Date().toDateString() + " " + new Date().toTimeString(),
        balanceLeft: user.balance - toTransfer.amount,
      },
    });
  };

  console.log(toTransfer);
  return (
    <Layout>
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <div className="">
          <div className="">
            <p>Transfer Money</p>
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
            <form onSubmit={handleSubmit}>
              <p className="mt-5">
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
              <div className="text-center container col-12 col-lg-6">
                <input
                  type="number"
                  className={`mt-5 border-0 form-control textMain fs-1 text-center fw-bold`}
                  placeholder="0.00"
                  name="amount"
                  value={toTransfer.amount}
                  max={user.balance}
                  min={1001}
                  onChange={(event) => handleChangeForm(event)}
                  autoFocus
                  required
                />
                <p className="mt-5">
                  Rp.{user.balance?.toLocaleString()} Available
                </p>
                <div
                  className={`mx-auto text-center input-group my-5  border-bottom opacity-50 
                  ${toTransfer.notes ? "border-primary" : ""}
                  `}
                >
                  <span
                    className="input-group-text border-0 bg-white ps-0 text-black-50"
                    id="basic-addon1"
                  >
                    <i
                      className={`bi bi-pen fs-3 ${
                        toTransfer.notes ? "textMain" : ""
                      } `}
                    ></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 fs-5 "
                    placeholder="Add some notes"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="notes"
                    onChange={(event) => handleChangeForm(event)}
                  />
                </div>
              </div>
              <div className="text-lg-end pt-5 text-center">
                <button className="btn btn-lg bgMain ">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

