import { useGetTempleListQuery } from "@/graphql/generated/schema";
import { Form, Select } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  familyId?: number | null;
};

const TempleSelect = ({ familyId }: Props) => {
  const [keyword, setKeyword] = useState("");
  const { data: templesData } = useGetTempleListQuery({
    variables: { keyword, ...(familyId && { familyId }) },
  });

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
      label="Chùa"
      name="templeId"
      rules={[{ required: true, message: "Please input your temple!" }]}
    >
      <Select
        showSearch
        optionFilterProp="children"
        onSearch={onSearch}
        filterOption={filterOption}
        options={options}
      />
    </Form.Item>
  );
};

export default TempleSelect;
