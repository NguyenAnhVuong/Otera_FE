"use client";
import useTrans from "@/hooks/useTrans";
import { DEBOUNCE_TIME } from "@/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type SearchInputProps = {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({ setSearchKeyword }) => {
  const { localeText } = useTrans();
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchKeyword(searchVal);
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal, setSearchKeyword]);

  return (
    <Input
      onChange={(e) => setSearchVal(e.target.value)}
      prefix={<SearchOutlined />}
      placeholder={localeText.search}
    />
  );
};

export default SearchInput;
