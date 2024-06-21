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
  const [status, setStatus] = useState<EStatus | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: localeText.all,
    },
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

  const onChange = (key: string) => {
    if (key === "all") {
      setStatus(null);
      setIsDeleted(false);
    } else if (key === "isDeleted") {
      setIsDeleted(true);
      setStatus(null);
    } else {
      setStatus(key as EStatus);
      setIsDeleted(false);
    }
  };

  return (
    <div>
      <PageTitle title={localeText.temple.deceasedList.title} />
      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
      {/* TODO temple add deceased */}
      <TempleDeceasedTable status={status} isDeleted={isDeleted} />
    </div>
  );
};

export default TempleDeceasedList;
