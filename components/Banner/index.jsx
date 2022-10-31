import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <div>
      <div className="textMain fs-1 py-5 d-flex d-lg-none">
        <p className="py-5 mx-auto">FazzPay</p>
      </div>
      <div className="bgMain d-none d-lg-block">
        <h3 className="ms-5 ps-5 pt-5">RiWallet</h3>
        <div className="overflow-hidden" style={{ position: "relative" }}>
          <svg
            width="807"
            height="892"
            viewBox="0 0 807 892"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-488.376 189.221C-663.649 189.221 -807.307 361.569 -775.807 534.056V1312.37H876.379V0.0478516C815.205 154.863 718.616 220.569 552.209 220.569C381.981 220.569 324.209 28.1535 161.044 28.1535C-65.0798 28.1535 14.087 512.436 -156.642 512.436C-337.483 512.436 -317.647 189.221 -488.376 189.221Z"
              fill="url(#paint0_linear_100_3370)"
              fillOpacity="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_100_3370"
                x1="48.1063"
                y1="0.0478516"
                x2="47.547"
                y2="1239.94"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.2" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className=""
            style={{ position: "absolute", top: "60px", left: "60px" }}
          >
            <Image src="/Group 57.png" width={512} height={575} alt=""></Image>
          </div>
          <div
            className="mx-auto"
            style={{
              position: "absolute",
              bottom: "50px",
              left: "80px",
              width: "75%",
            }}
          >
            <h3>App that Covering Banking Needs.</h3>
            <p className="mt-4 lh-lg fw-lighter">
              RiWallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in RiWallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
