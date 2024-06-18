"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import EventManagementTable from "@/components/Molecules/EventManagementTable";
import EventOrganizeButton from "@/components/Organisms/EventOrganizeButton";
import useTrans from "@/hooks/useTrans";
import { Select, Tabs, TabsProps } from "antd";
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

  const handleChange = (value: string) => {
    if (value === "all") {
      setFilter({});
    } else {
      setFilter((prev) => ({ ...prev, isFreeOpen: true }));
    }
  };

  return (
    <div className="mt-8">
      <PageTitle title={localeText.event.eventManagements} />
      <div className="flex items-center justify-between gap-2">
        <Tabs
          className="w-full"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
        <div className="flex gap-2">
          <Select
            defaultValue={"all"}
            style={{ width: 128 }}
            onChange={handleChange}
            options={[
              { value: "all", label: localeText.event.all },
              { value: "isFreeOpen", label: localeText.event.isFreeOpen },
            ]}
          />
          <EventOrganizeButton />
        </div>
      </div>
      <EventManagementTable filter={filter} />
    </div>
  );
};

export default EventManagements;
