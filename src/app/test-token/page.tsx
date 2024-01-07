"use client";
import { useTest123Query } from "@/graphql/generated/schema";

type Props = {};

const TestToken = (props: Props) => {
  const { data } = useTest123Query();
  return <div>TestToken</div>;
};

export default TestToken;
