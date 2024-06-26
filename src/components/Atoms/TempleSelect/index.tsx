import { useGetTempleListQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Form, Select } from "antd";
import { useState } from "react";

type TempleSelectProps = {
  required?: boolean;
  displayLabel?: boolean;
  disabled?: boolean;
};

const TempleSelect: React.FC<TempleSelectProps> = ({
  required = true,
  displayLabel = true,
  disabled = false,
}) => {
  const [keyword, setKeyword] = useState("");
  const { data: templesData } = useGetTempleListQuery({
    variables: { keyword },
  });

  const { localeText } = useTrans();

  const temples = templesData?.getTemples?.data?.data || [];

  const options = temples.reduce(
    (arr: { label: string; value: number }[], temple) => {
      return temple
        ? [
            ...arr,
            {
              label: localeText.temple.preName + " " + temple.name,
              value: temple.id,
            },
          ]
        : arr;
    },
    []
  );

  let timer: NodeJS.Timeout;

  const onSearch = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setKeyword(value);
    }, 500);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: number }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Form.Item
      className="min-w-[200px]"
      label={displayLabel ? localeText.temple.title : ""}
      name="templeId"
      rules={[
        {
          required: required,
          message: localeText.validateMessages.required(
            localeText.temple.title
          ),
        },
      ]}
    >
      <Select
        className="w-full"
        showSearch
        optionFilterProp="children"
        placeholder={localeText.selectTemple}
        onSearch={onSearch}
        filterOption={filterOption}
        options={options}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default TempleSelect;
