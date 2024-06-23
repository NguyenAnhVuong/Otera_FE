import UpdateTemple from "@/components/Templates/UpdateTemple";
import { NextPage } from "next";
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const Page: NextPage<PageProps> = ({ params: { id } }) => {
  return (
    <div>
      <UpdateTemple id={+id} />
    </div>
  );
};

export default Page;
