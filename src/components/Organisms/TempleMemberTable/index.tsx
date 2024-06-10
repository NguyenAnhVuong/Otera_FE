import DeleteButton from "@/components/Atoms/DeleteButton";
import FilterCheckboxInput from "@/components/Atoms/FilterCheckboxInput";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import {
  ERole,
  GetTempleMembersDocument,
  OrderBy,
  useGetTempleMembersQuery,
  useRemoveTempleMemberMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Table, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";

type TempleMemberTableProps = {};

type DataType = {
  id: number;
  avatar: string;
  name: string;
  email?: string | null;
  address?: string | null;
  birthday?: string | null;
  role: ERole;
};

const TempleMemberTable: React.FC<TempleMemberTableProps> = ({}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [dataSource, setDataSource] = useState<DataType[] | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const [roleFilter, setRoleFilter] = useState<(string | number)[]>([
    ERole.TempleAdmin,
    ERole.TempleMember,
  ]);
  const { loading } = useGetTempleMembersQuery({
    variables: {
      page,
      take: TAKE,
      name,
      address,
      email,
      phone,
      roles: roleFilter as ERole[],
      orderBy,
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setDataSource(
        data.getTempleMembers.data.data?.map((member) => ({
          id: member.id,
          avatar: member.userDetail.avatar,
          name: member.userDetail.name,
          address: member.userDetail.address,
          email: member.email,
          birthday: member.userDetail.birthday,
          role: member.role,
        }))
      );
      setTotalItems(data.getTempleMembers.data.totalItems);
    },
    notifyOnNetworkStatusChange: true,
  });

  const [removeTempleMember, { loading: removeLoading }] =
    useRemoveTempleMemberMutation({
      onCompleted: () => {
        messageApi.success(
          localeText.temple.members.removeMemberSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(localeText.temple.members.removeMemberFailMessage);
      },
      refetchQueries: [GetTempleMembersDocument],
    });

  const handleRemoveFamilyMember = async (userId: number) => {
    await removeTempleMember({
      variables: {
        removeTempleMemberInput: {
          userId,
        },
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: localeText.avatar,
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        <Image
          className="object-contain"
          src={avatar}
          alt={localeText.avatar}
          fill
        />
      ),
      width: 84,
    },
    {
      title: localeText.family.familyMember.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span>{name}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
    },
    {
      title: localeText.family.familyMember.email,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span>{email}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setEmail} />
      ),
    },
    {
      title: localeText.family.familyMember.phone,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (phone) => <span>{phone}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setPhone} />
      ),
    },
    {
      title: localeText.family.familyMember.address,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) => <span>{address}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setAddress} />
      ),
    },
    {
      title: localeText.family.familyMember.birthday,
      key: "birthday",
      dataIndex: "birthday",
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
      showSorterTooltip: false,
    },
    {
      title: localeText.role,
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => (
        <Tag color={role === ERole.TempleAdmin ? "gold" : "green"}>
          {role === ERole.TempleAdmin ? localeText.admin : localeText.member}
        </Tag>
      ),
      filterDropdown: (props) => (
        <FilterCheckboxInput
          {...props}
          setFilter={setRoleFilter}
          options={[
            { label: localeText.admin, value: ERole.TempleAdmin },
            { label: localeText.member, value: ERole.TempleMember },
          ]}
        />
      ),
      width: 128,
    },
    {
      title: localeText.action,
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          {record.role !== ERole.TempleAdmin && (
            <DeleteButton
              okText={localeText.OK}
              cancelText={localeText.cancel}
              tooltipTitle={localeText.family.familyMember.deleteMember}
              popConfirmTitle={
                localeText.family.familyMember.deleteMemberPopConfirm.title
              }
              popConfirmDescription={
                localeText.family.familyMember.deleteMemberPopConfirm
                  .description
              }
              popConfirmOnConfirm={() => handleRemoveFamilyMember(record.id)}
            />
          )}
        </>
      ),
      width: 108,
    },
  ];

  return (
    <>
      {(loading || removeLoading) && <Loading />}
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
        locale={{
          filterConfirm: localeText.filter,
          filterReset: localeText.reset,
        }}
      />
    </>
  );
};

export default TempleMemberTable;
