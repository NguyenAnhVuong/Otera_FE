import useTrans from "@/hooks/useTrans";
import { Button, Checkbox, CheckboxOptionType, Divider } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import React, { useMemo, useState } from "react";

interface FilterCheckboxInputProps extends FilterDropdownProps {
  setFilter: (arr: (string | number)[]) => void;
  options: CheckboxOptionType<string | number>[];
}

const FilterCheckboxInput: React.FC<FilterCheckboxInputProps> = ({
  setSelectedKeys,
  confirm,
  setFilter,
  options,
}) => {
  const { localeText } = useTrans();
  const defaultFilter = useMemo(
    () => options.map((option) => option.value),
    [options]
  );
  const [checkedList, setCheckedList] =
    useState<(string | number)[]>(defaultFilter);

  return (
    <div className="p-2">
      <Checkbox.Group
        options={options}
        value={checkedList}
        onChange={(values) => setCheckedList(values)}
      />
      <div className="flex gap-2 mt-2 pt-2 justify-center border-t border-0 border-solid border-[#f0f0f0]">
        <Button
          onClick={() => {
            setSelectedKeys([]);
            setCheckedList(defaultFilter);
            setFilter(defaultFilter);
            confirm();
          }}
          size="small"
        >
          {localeText.reset}
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys(checkedList);
            setFilter(checkedList);
            confirm();
          }}
          type="primary"
          size="small"
        >
          {localeText.search}
        </Button>
      </div>
    </div>
  );
};

export default FilterCheckboxInput;
