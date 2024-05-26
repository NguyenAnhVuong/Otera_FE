"use client";
import UpdateDeceased from "@/components/Templates/UpdateDeceased";
import { NextPage } from "next";

type PageProps = {
  params: { id: number };
};

const Page: NextPage<PageProps> = ({ params }) => {
  return <UpdateDeceased id={Number(params.id)} />;
};

export default Page;
