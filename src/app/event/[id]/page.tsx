import EventDetail from "@/components/Molecules/EventDetail";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return <EventDetail id={Number(params.id)} />;
};

export default Page;
