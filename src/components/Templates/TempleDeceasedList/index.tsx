"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import TempleDeceasedTable from "@/components/Organisms/TempleDeceasedTable";
import { EStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";

type TempleDeceasedListProps = {};

const TempleDeceasedList: React.FC<TempleDeceasedListProps> = ({}) => {
  const { localeText } = useTrans();
  const [status, setStatus] = useState<string>(EStatus.Pending);

  const items: TabsProps["items"] = [
    {
      key: EStatus.Pending,
      label: localeText.temple.deceasedList.status.pending,
    },
    {
      key: EStatus.Approved,
      label: localeText.temple.deceasedList.status.approved,
    },
    {
      key: EStatus.Rejected,
      label: localeText.temple.deceasedList.status.rejected,
    },
    {
      key: "isDeleted",
      label: localeText.temple.deceasedList.status.isDeleted,
    },
  ];

  return (
    <div>
      <PageTitle title={localeText.temple.deceasedList.title} />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(key: string) => setStatus(key)}
      />
      {/* TODO temple add deceased */}
      <TempleDeceasedTable status={status} />
    </div>
  );
};

export default TempleDeceasedList;
