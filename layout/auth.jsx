import React from "react";
import Head from "next/head";
import Banner from "../components/Banner";

export default function MainLayout(props) {
  return (
    <>
      <Head>
        <title>{props.head}</title>
      </Head>
      <div className="bgSecondary containerMain">
        <div
          className="container rounder-top shadow-lg m-0 p-0 mx-auto my-lg-5 row overflow-hidden bg-white"
          style={{ maxHeight: "inherit" }}
        >
          <div className="col-12 col-lg-6 p-0">
            <Banner />
          </div>
          <div
            className="col-12 col-lg-6 authMain bg-white"
            style={{ maxHeight: "inherit" }}
          >
            <div className="row ps-2 ps-lg-5">
              <div className="col-12 text-center text-lg-start col-lg-9 mt-3">
                <h3 className="mt-5  d-block d-lg-none">{props.title}</h3>
                <h6 className="mt-3 text-black-50 d-block d-lg-none lh-base">
                  {props.subTitle}
                </h6>
                <h3 className="d-none d-lg-block pt-5 mt-5 lh-base">
                  {props.dTitle}
                </h3>
                <h6 className="d-none d-lg-block text-black-50 mt-4 lh-lg">
                  {props.dSubTitle}
                </h6>
                <div>{props.children}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="invisible d-none d-lg-block"> &nbsp;</div>
      </div>
    </>
  );
}
