"use client";
import VerifyRegister from "@/components/Templates/VerifyRegister";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import React from "react";

type PageProps = {};

const Page: NextPage<PageProps> = ({}) => {
  const searchParams = useSearchParams();
  return <VerifyRegister token={searchParams.get("token")} />;
};

export default Page;
