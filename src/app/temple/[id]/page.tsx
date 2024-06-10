import TempleDetail from "@/components/Templates/TempleDetail";
import { NextPage } from "next";

type Props = {
  params: { id: string };
};

const Page: NextPage<Props> = ({ params }) => {
  return <TempleDetail templeId={+params.id} />;
};

export default Page;
