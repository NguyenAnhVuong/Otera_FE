"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import TempleTable from "@/components/Organisms/TempleTable";
import { EStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tabs, TabsProps } from "antd";
import { useState } from "react";

type SystemTempleListProps = {};

const SystemTempleList: React.FC<SystemTempleListProps> = ({}) => {
  const { localeText } = useTrans();
  const [status, setStatus] = useState<EStatus>(EStatus.Pending);
  const items: TabsProps["items"] = [
    {
      key: EStatus.Pending,
      label: localeText.system.temple.status.pending,
    },
    {
      key: EStatus.Approved,
      label: localeText.system.temple.status.approved,
    },
    {
      key: EStatus.Blocked,
      label: localeText.system.temple.status.blocked,
    },
    {
      key: EStatus.Rejected,
      label: localeText.system.temple.status.rejected,
    },
  ];

  const onChange = (key: string) => {
    setStatus(key as EStatus);
  };

  return (
    <div>
      <PageTitle title={localeText.system.temple.title} />
      <Tabs
        defaultActiveKey={EStatus.Pending}
        items={items}
        onChange={onChange}
      />
      <TempleTable status={status} />
    </div>
  );
};

export default SystemTempleList;
