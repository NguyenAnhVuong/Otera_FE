import Family from "@/components/Atoms/Family";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import AvatarCustom from "@/components/Molecules/AvatarCustom";
import TempleDeceasedActions from "@/components/Molecules/TempleDeceasedActions";
import {
  EStatus,
  OrderBy,
  TempleGetDeceasedListDocument,
  useTempleGetDeceasedListQuery,
  useUpdateDeceasedStatusMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

type TempleDeceasedTableProps = {
  status: string;
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
}

const TempleDeceasedTable: React.FC<TempleDeceasedTableProps> = ({
  status,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
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
      ...(status === "isDeleted"
        ? { isDeleted: true }
        : { status: status as EStatus }),
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
      render: (avatar) => <AvatarCustom src={avatar} />,
      width: 112,
    },
    {
      title: localeText.temple.deceasedList.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span>{name}</span>,
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
      title: localeText.temple.deceasedList.action,
      key: "action",
      align: "center",
      render: (_, record) => (
        <TempleDeceasedActions
          deceasedId={record.id}
          deceasedName={record.name}
          status={status}
          rejectReason={record.rejectReason}
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
