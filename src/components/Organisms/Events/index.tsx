"use client";
import Loading from "@/components/Atoms/Loading";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import TempleSelect from "@/components/Atoms/TempleSelect";
import Event from "@/components/Molecules/Event";
import { useGetEventsQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Form, Pagination, Select } from "antd";
import { useState } from "react";

type Props = {};

const Events = (props: Props) => {
  const [page, setPage] = useState(PAGE);
  const [form] = Form.useForm();
  const { localeText } = useTrans();
  const templeId = Form.useWatch("templeId", form);
  const filter = Form.useWatch("filter", form);
  const getFilter = () => {
    switch (filter) {
      case "upcoming":
        return { upcoming: true };
      default:
        return {};
    }
  };
  const { data, loading, error } = useGetEventsQuery({
    variables: {
      page: page,
      take: TAKE,
      templeId: Number(templeId),
      ...(filter && getFilter()),
    },
  });

  return (
    <div className="">
      {loading && <Loading />}
      <PageTitleWithActions title={localeText.event.listEvents}>
        <Form form={form} className="flex justify-end items-center gap-2">
          <TempleSelect required={false} displayLabel={false} />
          <Form.Item name="filter" initialValue={"all"}>
            <Select
              style={{ width: 120 }}
              placeholder={localeText.filter}
              options={[
                { value: "all", label: localeText.all },
                // { value: "upcoming", label: localeText.event.upcoming },
              ]}
            />
          </Form.Item>
        </Form>
      </PageTitleWithActions>
      <div className="grid grid-cols-2 gap-4">
        {data?.getEvents.data.data.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            avatar={event.avatar}
            name={event.name}
            address={event.address}
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
          className="mt-4 text-center"
          defaultCurrent={PAGE}
          total={data.getEvents.data.totalItems}
          onChange={(page) => setPage(page)}
          pageSize={TAKE}
        />
      )}
    </div>
  );
};

export default Events;
