import useTrans from "@/hooks/useTrans";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import React from "react";

interface FilterSearchInputProps extends FilterDropdownProps {
  setKeyword: (keyword: string) => void;
}

const FilterSearchInput: React.FC<FilterSearchInputProps> = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  setKeyword,
}) => {
  const { localeText } = useTrans();
  return (
    <div className="p-2">
      <Input
        type="text"
        placeholder={localeText.search}
        onChange={(e) => setSelectedKeys([e.target.value])}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setKeyword(selectedKeys[0].toString());
            confirm();
          }
        }}
        value={selectedKeys[0]}
        prefix={<SearchOutlined />}
      />
      <div className="flex gap-2 mt-2 justify-center pt-2 border-t border-0 border-solid border-[#f0f0f0]">
        <Button
          onClick={() => {
            setKeyword("");
            setSelectedKeys([]);
            confirm();
          }}
          size="small"
        >
          {localeText.reset}
        </Button>
        <Button
          onClick={() => {
            setKeyword(selectedKeys[0].toString());
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

export default FilterSearchInput;
