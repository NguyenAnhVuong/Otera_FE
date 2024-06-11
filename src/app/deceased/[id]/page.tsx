import DeceasedDetail from "@/components/Templates/DeceasedDetail";
import { NextPage } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

const Page: NextPage<PageProps> = ({ params }) => {
  return <DeceasedDetail id={+params.id} />;
};

export default Page;
