import useTrans from "@/hooks/useTrans";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

type SearchInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const { localeText } = useTrans();
  return (
    <Input
      onChange={onChange}
      prefix={<SearchOutlined />}
      placeholder={localeText.search}
    />
  );
};

export default SearchInput;
