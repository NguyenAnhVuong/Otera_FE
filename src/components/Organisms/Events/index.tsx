import CreateEventButton from "@/components/Atoms/CreateEventButton";
import Event from "@/components/Molecules/Event";
import { useTempleGetEventsQuery } from "@/graphql/generated/schema";
import { Pagination } from "antd";

type Props = {};

const Events = (props: Props) => {
  const { data, loading, error } = useTempleGetEventsQuery({
    variables: {},
  });

  return (
    <div className="mt-8">
      <CreateEventButton />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data?.templeGetEvents.data.data.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            avatar={event.avatar}
            name={event.name}
            startDateEvent={event.startDateEvent}
            endDateEvent={event.endDateEvent}
            startDateBooking={event.startDateBooking}
            endDateBooking={event.endDateBooking}
            maxParticipant={event.maxParticipant}
          />
        ))}
      </div>
      {data && (
        <Pagination
          className="mt-4 text-right"
          defaultCurrent={1}
          total={data.templeGetEvents.data.totalItems}
        />
      )}
    </div>
  );
};

export default Events;
