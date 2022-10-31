import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LandingPage() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>LandingPage percobaan</h1>
    </div>
  );
}
