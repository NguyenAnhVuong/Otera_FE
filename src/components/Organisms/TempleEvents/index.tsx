"use client";
import Loading from "@/components/Atoms/Loading";
import NoData from "@/components/Atoms/NoData";
import Event from "@/components/Molecules/Event";
import { useTempleGetEventsQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Form, Pagination, Select } from "antd";
import { useState } from "react";

type Props = {};

const TempleEvents = (props: Props) => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(PAGE);
  const { localeText } = useTrans();
  const filter = Form.useWatch("filter", form);
  const getFilter = () => {
    switch (filter) {
      case "upcoming":
        return { upcoming: true };
      case "ended":
        return { ended: true };
      default:
        return {};
    }
  };
  const { data, loading, error } = useTempleGetEventsQuery({
    variables: {
      page: page,
      take: TAKE,
      ...(filter && getFilter()),
    },
  });

  return (
    <div className="mt-8">
      {loading && <Loading />}
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h3 className="text-black m-0">{localeText.event.templeEvents}</h3>
        </div>
        <Form form={form} className="flex justify-end items-center gap-2">
          <Form.Item name="filter" initialValue={"all"}>
            <Select
              style={{ width: 120 }}
              placeholder={localeText.filter}
              options={[
                { value: "all", label: localeText.all },
                { value: "upcoming", label: localeText.event.upcoming },
                { value: "ended", label: localeText.event.ended },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      {data && data.templeGetEvents.data.totalItems ? (
        <Pagination
          className="mt-4 text-center"
          current={page}
          total={data.templeGetEvents.data.totalItems}
          onChange={(page) => setPage(page)}
          pageSize={TAKE}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default TempleEvents;
