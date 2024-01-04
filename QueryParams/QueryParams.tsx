"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useProfileApi from "hooks/apiHooks/Profile/useProfileApi";

const QueryParams = () => {
  const searchParams = useSearchParams();

  const token = searchParams?.get("login");

  const { getProfile } = useProfileApi();

  useEffect(() => {
    if (!!token) {
      localStorage.setItem("@jwtToken", token);
    }
    getProfile();
  }, [token]);

  return <></>;
};

export default QueryParams;
