import DeleteButton from "@/components/Atoms/DeleteButton";
import FilterCheckboxInput from "@/components/Atoms/FilterCheckboxInput";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import {
  ERole,
  GetFamilyMembersDocument,
  OrderBy,
  useGetFamilyMembersQuery,
  useRemoveFamilyMemberMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Table, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DataType {
  id: number;
  avatar: string;
  name: string;
  address?: string | null;
  birthday: string;
  email: string;
  phone?: string | null;
  role: ERole;
}

type FamilyMemberTableProps = {
  familyId?: number | null;
};

const FamilyMemberTable: React.FC<FamilyMemberTableProps> = ({ familyId }) => {
  const { role } = useAppSelector((state) => state.auth);
  const { messageApi } = useAppSelector((state) => state.antd);
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const { localeText } = useTrans();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleFilter, setRoleFilter] = useState<(string | number)[]>([
    ERole.FamilyAdmin,
    ERole.FamilyMember,
  ]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const { data, loading } = useGetFamilyMembersQuery({
    variables: {
      id: familyId as number,
      name,
      address,
      email,
      phone,
      roleFilter: roleFilter as ERole[],
      take: TAKE,
      page,
    },
    skip: !familyId,
  });

  const [removeFamilyMember] = useRemoveFamilyMemberMutation({
    onCompleted: () => {
      messageApi.success(localeText.family.familyMember.removeSuccessMessage);
    },
    onError: () => {
      messageApi.error(localeText.family.familyMember.removeFailedMessage);
    },
    refetchQueries: [GetFamilyMembersDocument],
  });

  const handleRemoveFamilyMember = async (id: number) => {
    await removeFamilyMember({
      variables: {
        removeFamilyMemberInput: {
          id,
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
        <span>{dayjs(birthday).format(formatDate.YYYY_MM_DD_HH_MM)}</span>
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
      title: localeText.role,
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => (
        <Tag color={role === ERole.FamilyAdmin ? "gold" : "green"}>
          {role === ERole.FamilyAdmin ? localeText.admin : localeText.member}
        </Tag>
      ),
      filterDropdown: (props) => (
        <FilterCheckboxInput
          {...props}
          setFilter={setRoleFilter}
          options={[
            { label: localeText.admin, value: ERole.FamilyAdmin },
            { label: localeText.member, value: ERole.FamilyMember },
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
          {record.role !== ERole.FamilyAdmin && (
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
      hidden: role !== ERole.FamilyAdmin,
      width: 108,
    },
  ];

  useEffect(() => {
    if (data?.getFamilyMembers.data) {
      const users = data.getFamilyMembers.data.data;
      if (users) {
        const data = users.map((user) => ({
          id: user.id,
          avatar: user.userDetail.avatar,
          name: user.userDetail.name,
          address: user.userDetail.address,
          birthday: user.userDetail.birthday,
          email: user.email,
          phone: user.userDetail.phone,
          role: user.role,
        }));
        setDataSource(data);
      }
      setTotalItems(data.getFamilyMembers.data.totalItems);
    }
  }, [data]);

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
        locale={{
          filterConfirm: localeText.filter,
          filterReset: localeText.reset,
        }}
      />
    </>
  );
};

export default FamilyMemberTable;
