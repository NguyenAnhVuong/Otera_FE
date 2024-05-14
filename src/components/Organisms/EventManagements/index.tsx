"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import EventManagementTable from "@/components/Molecules/EventManagementTable";
import useTrans from "@/hooks/useTrans";
import { Tabs, TabsProps } from "antd";
import { useState } from "react";

type Props = {};

const EventManagements = (props: Props) => {
  const { localeText } = useTrans();
  const [filter, setFilter] = useState({});

  const onChange = (key: string) => {
    switch (key) {
      case "all":
        setFilter({});
        break;
      case "upcoming":
        setFilter({ upcoming: true });
        break;
      case "onGoing":
        setFilter({ onGoing: true });
        break;
      case "ended":
        setFilter({ ended: true });
        break;
      default:
        break;
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: localeText.event.all,
    },
    {
      key: "upcoming",
      label: localeText.event.upcoming,
    },
    {
      key: "onGoing",
      label: localeText.event.onGoing,
    },
    {
      key: "ended",
      label: localeText.event.ended,
    },
  ];

  return (
    <div className="mt-8">
      <PageTitle title={localeText.event.eventManagements} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <EventManagementTable filter={filter} />
    </div>
  );
};

export default EventManagements;
