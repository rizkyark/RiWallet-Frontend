import React, { useEffect, useState } from "react";
import Layout from "../../layout/main";
import Card from "../../components/Card/transaction";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import cookies from "next-cookies";
import axios from "axios";

export async function getServerSideProps(context) {
  try {
    const dataCookies = cookies(context);
    const params = context.query;
    const page = !params?.page ? 1 : params.page;
    const limit = params?.limit || 7;
    const search = params?.search || "";

    const result = await axios.get(
      `${process.env.URL_BACKEND}/user?page=${page}&limit=${limit}&search=${search}&sort=firstName ASC`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    console.log(result);
    return {
      props: {
        data: result.data?.data || [],
        pageInfo: result.data?.pagination || {},
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination:
          error.response.status === 403
            ? "/auth/login"
            : `/error?msg=${error.response.data.msg}`,
        permanent: false,
      },
    };
  }
}

function Transfer(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(props);
  //   const user = useSelector((state) => state.user);
  //   const { data } = user;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    search: "",
    sort: "",
    hasMore: true,
  });
  const [pageInfo, setPageInfo] = useState({});

  //   useEffect(() => {
  //     getData();
  //   }, []);

  useEffect(() => {
    router.push(
      `/transfer?limit=${pagination.limit}&search=${pagination.search}`
    );
  }, [pagination]);

  //   const getData = async () => {
  //     try {
  //       dispatch(getAllUser(pagination))
  //         .then((res) => setPageInfo(res.value.data.pagination))
  //         .catch((err) => console.log(err));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const search = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      setPagination({ ...pagination, search: event.target.value });
    }
  };
  console.log(
    pagination.limit <= (pageInfo ? props.pageInfo.totalData : Number.MAX_VALUE)
  );
  return (
    <Layout page="transfer" head="Transfer">
      <div
        className="bg-white rounder shadow p-3 overflow-auto"
        style={{ maxHeight: "inherit", position: "", height: "100vh" }}
        id="scrollableDiv"
      >
        <div className="">
          <div className="">
            <p>
              <i
                onClick={() => router.back()}
                className="bi bi-arrow-left me-2"
              ></i>
              Search Receiver
            </p>
            <div className="input-group mb-3">
              <span
                className="input-group-text border-0 bg-light"
                id="basic-addon1"
              >
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Search receiver here"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onKeyDown={(e) => search(e)}
                onChange={(e) =>
                  setPagination({ ...pagination, search: event.target.value })
                }
              ></input>
            </div>
          </div>
          <InfiniteScroll
            dataLength={pagination.limit}
            next={() =>
              setPagination({
                ...pagination,
                limit: pagination.limit + 4,
                hasMore:
                  pagination.limit <=
                  (pageInfo ? props.pageInfo.totalData : Number.MAX_VALUE),
              })
            }
            scrollThreshold={0.9}
            hasMore={pagination.hasMore}
            loader={
              <div className="text-center">
                <Spinner
                  animation="border"
                  size="lg"
                  className="my-4"
                  variant="primary"
                />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <div className="rounder px-2 w-100 pb-5">
              {Array.isArray(props.data) &&
                props.data.map((value) => (
                  <div
                    key={value.id}
                    onClick={() =>
                      router.push({
                        pathname: `/transfer/${value.id}`,
                        query: value,
                      })
                    }
                  >
                    <Card
                      leftTop={`${value.firstName} ${value.lastName}`}
                      leftBottom={`${value.noTelp}`}
                      right={``}
                      image={`${value.image}`}
                      className="mt-3 shadow-sm"
                    />
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
}

export default Transfer;
