import React from "react";
import Image from "next/image";

export default function Transaction(props) {
  return (
    <div className="px-0">
      <div className={` bg-white rounder ${props.className}`}>
        <div className="d-flex p-3">
          <div
            className="col-1"
            style={{
              height: "52px",
              width: "52px",
              position: "relative",
            }}
          >
            {props.image ? (
              <Image
                src={
                  props.image && props.image !== "null"
                    ? `${process.env.URL_CLOUDINARY}${props.image}`
                    : `https://ui-avatars.com/api/?name=${props.leftTop}&background=random&size=44&format=png`
                }
                alt=""
                style={{ objectFit: "cover" }}
                layout="fill"
              />
            ) : (
              ""
            )}
          </div>
          <div className="d-flex flex-grow-1 justify-content-between ms-2">
            <div className="">
              <h5 className="fw-bold">{props.leftTop} </h5>
              <p className="mb-1 fw-light">{props.leftBottom}</p>
            </div>

            <div className="mt-2">
              {props.right ? (
                props.type == "topup" || props.type == "accept" ? (
                  <p className=" fs-5 fs-lg-1 fw-bold text-success">
                    +Rp.{Number(props.right).toLocaleString()}
                  </p>
                ) : (
                  <p className=" fs-5 fs-lg-1 fw-bold text-danger">
                    -Rp.{Number(props.right).toLocaleString()}
                  </p>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
