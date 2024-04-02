import UpdateEvent from "@/components/Organisms/UpdateEvent";
import React from "react";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return <UpdateEvent id={Number(params.id)} />;
};

export default Page;
