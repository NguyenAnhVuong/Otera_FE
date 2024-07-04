import Family from "@/components/Atoms/Family";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import AvatarCustom from "@/components/Molecules/AvatarCustom";
import DeceasedStatus from "@/components/Molecules/DeceasedStatus";
import TempleDeceasedActions from "@/components/Molecules/TempleDeceasedActions";
import {
  EStatus,
  OrderBy,
  useTempleGetDeceasedListQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";

type TempleDeceasedTableProps = {
  status?: EStatus | null;
  isDeleted: boolean;
};

interface DataType {
  id: number;
  avatar: string;
  name: string;
  tombAddress?: string | null;
  birthday?: string;
  dateOfDeath?: string;
  address?: string | null;
  rejectReason?: string | null;
  familyAvatar: string;
  familyName: string;
  familyCode: string;
  status?: EStatus | null;
  isDeleted?: boolean;
}

const TempleDeceasedTable: React.FC<TempleDeceasedTableProps> = ({
  status,
  isDeleted,
}) => {
  const { localeText } = useTrans();
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(PAGE);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tombAddress, setTombAddress] = useState("");
  const [familyKeyword, setFamilyKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const [dataSource, setDataSource] = useState<DataType[] | undefined>();

  const { loading } = useTempleGetDeceasedListQuery({
    variables: {
      isDeleted,
      status,
      page,
      take: TAKE,
      name,
      address,
      orderBy,
      tombAddress,
      familyKeyword,
    },
    onCompleted: (data) => {
      setTotalItems(data.templeGetDeceasedList.data.totalItems);
      setDataSource(
        data.templeGetDeceasedList.data.data.map((item) => ({
          id: item.id,
          avatar: item.userDetail.avatar,
          name: item.userDetail.name,
          tombAddress: item.tombAddress,
          birthday: item.userDetail.birthday,
          dateOfDeath: item.dateOfDeath,
          address: item.userDetail.address,
          rejectReason: item.rejectReason,
          familyAvatar: item.family?.avatar,
          familyName: item.family?.name,
          familyCode: item.family?.familyCode,
          status: item.status,
          isDeleted: item.isDeleted,
        }))
      );
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "avatar",
      dataIndex: "avatar",
      title: localeText.temple.deceasedList.avatar,
      align: "center",
      render: (avatar, record) => (
        <Link className="text-black" href={`/deceased/${record.id}`}>
          <AvatarCustom src={avatar} />
        </Link>
      ),
      width: 112,
    },
    {
      title: localeText.temple.deceasedList.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name, record) => (
        <Link className="text-black" href={`/deceased/${record.id}`}>
          <span>{name}</span>
        </Link>
      ),
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
    },
    {
      title: localeText.temple.deceasedList.tombAddress,
      dataIndex: "tombAddress",
      key: "tombAddress",
      align: "center",
      render: (tombAddress) => <span>{tombAddress}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setTombAddress} />
      ),
      width: 132,
    },
    {
      title: localeText.temple.deceasedList.birthday,
      dataIndex: "birthday",
      key: "birthday",
      align: "center",
      render: (birthday) => (
        <span>{dayjs(birthday).format(formatDate.DD_MM_YYYY)}</span>
      ),
      width: 116,
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(orderBy, setOrderBy, "birthday", sortOrder),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleSortByColumn(orderBy, setOrderBy, "birthday"),
      }),
      showSorterTooltip: false,
    },
    {
      title: localeText.temple.deceasedList.dateOfDeath,
      dataIndex: "dateOfDeath",
      key: "dateOfDeath",
      align: "center",
      render: (dateOfDeath) => (
        <span>{dayjs(dateOfDeath).format(formatDate.DD_MM_YYYY)}</span>
      ),
      width: 116,
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(orderBy, setOrderBy, "dateOfDeath", sortOrder),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleSortByColumn(orderBy, setOrderBy, "dateOfDeath"),
      }),
      showSorterTooltip: false,
    },
    {
      title: localeText.temple.deceasedList.address,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) => <span>{address}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setAddress} />
      ),
    },
    {
      title: localeText.temple.deceasedList.family,
      key: "family",
      align: "center",
      render: (_, record) => (
        <Family name={record.familyName} code={record.familyCode} />
      ),
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setFamilyKeyword} />
      ),
    },
    {
      title: localeText.temple.deceasedList.status.title,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, record) => (
        <DeceasedStatus status={status} isDeleted={record.isDeleted} />
      ),
    },
    {
      title: localeText.temple.deceasedList.action,
      key: "action",
      align: "center",
      width: 108,
      render: (_, record) => (
        <TempleDeceasedActions
          deceasedId={record.id}
          deceasedName={record.name}
          status={record.status}
          rejectReason={record.rejectReason}
          isDeleted={record.isDeleted}
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

export default TempleDeceasedTable;
