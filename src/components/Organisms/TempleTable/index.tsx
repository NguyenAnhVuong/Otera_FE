import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import Creator from "@/components/Molecules/Creator";
import TempleTableActions from "@/components/Molecules/TempleTableActions";
import { EStatus, useSystemGetTemplesQuery } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE } from "@/utils/constants";
import { Table, TableProps } from "antd";
import Image from "next/image";
import React, { useState } from "react";

interface DataType {
  id: number;
  avatar: string;
  name: string;
  email?: string | null;
  address?: string | null;
  admin: {
    id: number;
    avatar: string;
    name: string;
    email: string;
  };
  rejectReason?: string | null;
  blockReason?: string | null;
}

type TempleTableProps = {
  status: EStatus;
};

const TempleTable: React.FC<TempleTableProps> = ({ status }) => {
  const { localeText } = useTrans();
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { loading } = useSystemGetTemplesQuery({
    variables: {
      page,
      take: TAKE,
      status,
      name,
      address,
      email,
    },
    onCompleted: (data) => {
      setTotalItems(data.systemGetTemples.data.totalItems);
      setDataSource(
        data.systemGetTemples.data.data?.map((item) => ({
          id: item.id,
          avatar: item.avatar,
          name: item.name,
          email: item.email,
          address: item.address,
          rejectReason: item.rejectReason,
          blockReason: item.blockReason,
          admin: {
            id: item.admin.id,
            avatar: item.admin.userDetail.avatar,
            name: item.admin.userDetail.name,
            email: item.admin.email,
          },
        })) || []
      );
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
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
      title: localeText.system.temple.creator,
      dataIndex: "admin",
      key: "admin",
      align: "center",
      render: (admin) => (
        <Creator avatar={admin.avatar} name={admin.name} email={admin.email} />
      ),
    },
    {
      title: localeText.system.temple.action,
      key: "action",
      align: "center",
      render: (_, record) => (
        <TempleTableActions
          templeId={record.id}
          templeName={record.name}
          status={status}
          rejectReason={record.rejectReason}
          blockReason={record.blockReason}
        />
      ),
    },
  ];

  return (
    <div>
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
    </div>
  );
};

export default TempleTable;
