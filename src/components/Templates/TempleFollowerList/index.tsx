"use client";
import PageTitleWithActions from "@/components/Atoms/PageTitleWithActions";
import TempleFollowerTable from "@/components/Organisms/TempleFollowerTable";
import useTrans from "@/hooks/useTrans";
import { Select } from "antd";
import { useState } from "react";

const TempleFollowerList = () => {
  const { localeText } = useTrans();
  const [isInFamily, setIsInFamily] = useState(false);

  const handleChange = (value: string) => {
    if (value === "isInFamily") {
      setIsInFamily(true);
    } else {
      setIsInFamily(false);
    }
  };

  return (
    <div>
      <PageTitleWithActions title={localeText.temple.followers.title}>
        <Select
          defaultValue="all"
          style={{ width: 156 }}
          onChange={handleChange}
          options={[
            { value: "all", label: localeText.all },
            {
              value: "isInFamily",
              label: localeText.temple.followers.isInFamily,
            },
          ]}
        />
      </PageTitleWithActions>
      <TempleFollowerTable isInFamily={isInFamily} />
    </div>
  );
};

export default TempleFollowerList;
