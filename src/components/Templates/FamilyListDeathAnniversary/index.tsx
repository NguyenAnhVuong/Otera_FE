import PageTitle from "@/components/Atoms/PageTitle";
import FamilyDeathAnniversaryTable from "@/components/Organisms/FamilyDeathAnniversaryTable";
import { EDeathAnniversaryStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tabs, TabsProps } from "antd";
import { useState } from "react";

const FamilyListDeathAnniversary = () => {
  const { localeText } = useTrans();
  const [status, setStatus] = useState<EDeathAnniversaryStatus | null>(null);

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: localeText.all,
    },
    {
      key: EDeathAnniversaryStatus.Pending,
      label: localeText.deathAnniversary.pending,
    },
    {
      key: EDeathAnniversaryStatus.Approved,
      label: localeText.deathAnniversary.approve,
    },
    {
      key: EDeathAnniversaryStatus.Ready,
      label: localeText.deathAnniversary.ready,
    },
    {
      key: EDeathAnniversaryStatus.Finished,
      label: localeText.deathAnniversary.finished,
    },
    {
      key: EDeathAnniversaryStatus.Rejected,
      label: localeText.deathAnniversary.reject,
    },
  ];

  const onChange = (key: string) => {
    if (key !== "all") {
      setStatus(key as EDeathAnniversaryStatus);
    } else {
      setStatus(null);
    }
  };

  return (
    <div>
      <PageTitle title={localeText.deathAnniversary.list} />
      <div className="flex items-center justify-between gap-2">
        <Tabs
          className="w-full"
          defaultActiveKey="all"
          items={items}
          onChange={onChange}
        />
      </div>
      <FamilyDeathAnniversaryTable status={status} />
    </div>
  );
};

export default FamilyListDeathAnniversary;
