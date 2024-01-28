"use client";
import { useTest123Query } from "@/graphql/generated/schema";

type Props = {};

const TestToken = (props: Props) => {
  const { data } = useTest123Query();
  return <div className="p-2 w-[100px] h-5">TestToken</div>;
};

export default TestToken;
