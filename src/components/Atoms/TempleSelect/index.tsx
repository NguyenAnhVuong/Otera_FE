import { useGetTempleListQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Form, Select } from "antd";
import { useState } from "react";

type TempleSelectProps = {
  familyId?: number | null;
  required?: boolean;
  displayLabel?: boolean;
};

const TempleSelect: React.FC<TempleSelectProps> = ({
  familyId,
  required = true,
  displayLabel = true,
}) => {
  const [keyword, setKeyword] = useState("");
  const { data: templesData } = useGetTempleListQuery({
    variables: { keyword, ...(familyId && { familyId }) },
  });

  const { localeText } = useTrans();

  const temples = templesData?.getTemples?.data?.data || [];

  const options = temples.reduce(
    (arr: { label: string; value: number }[], temple) => {
      return temple
        ? [
            ...arr,
            {
              label: temple.name,
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
      />
    </Form.Item>
  );
};

export default TempleSelect;
