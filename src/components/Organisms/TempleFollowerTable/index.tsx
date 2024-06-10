import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import {
  OrderBy,
  useTempleGetFollowersQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Table, TableProps } from "antd";
import Image from "next/image";
import React, { useState } from "react";

interface DataType {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  familyName?: string;
}
type TempleFollowerTableProps = { isInFamily: boolean };

const TempleFollowerTable: React.FC<TempleFollowerTableProps> = ({
  isInFamily,
}) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const { localeText } = useTrans();

  const { loading } = useTempleGetFollowersQuery({
    variables: {
      page: PAGE,
      take: TAKE,
      name,
      email,
      address,
      familyName,
      orderBy,
      isInFamily,
    },
    onCompleted: (data) => {
      setDataSource(
        data.templeGetFollowers.data.data.map((item) => ({
          id: item.id,
          avatar: item.user.userDetail.avatar,
          name: item.user.userDetail.name,
          email: item.user.email,
          phone: item.user.userDetail.phone,
          address: item.user.userDetail.address,
          familyName: item.user.family?.name,
        }))
      );
      setTotalItems(data.templeGetFollowers.data.totalItems);
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "avatar",
      dataIndex: "avatar",
      title: localeText.temple.followers.avatar,
      align: "center",
      render: (avatar) => (
        <Image
          className="object-contain"
          src={avatar}
          alt={localeText.temple.followers.avatar}
          fill
        />
      ),
      width: 84,
    },
    {
      title: localeText.temple.followers.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span>{name}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
    },
    {
      title: localeText.email,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span>{email}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setEmail} />
      ),
    },
    {
      title: localeText.phone,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: localeText.address,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) => <span>{address}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setAddress} />
      ),
    },
    {
      title: localeText.temple.followers.familyName,
      dataIndex: "familyName",
      key: "familyName",
      align: "center",
      render: (familyName) => <span>{familyName}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setFamilyName} />
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          total: totalItems,
          pageSize: TAKE,
          current: page,
          onChange: (page) => setPage(page),
        }}
      />
    </>
  );
};

export default TempleFollowerTable;
