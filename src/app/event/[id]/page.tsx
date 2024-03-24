import EventDetail from "@/components/Molecules/EventDetail";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <EventDetail id={Number(params.id)} />
    </div>
  );
};

export default Page;
