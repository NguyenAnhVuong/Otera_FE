import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import EventParticipantListActions from "@/components/Molecules/EventParticipantListActions";
import {
  EBookingStatus,
  OrderBy,
  useGetEventParticipantsQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Checkbox, Table, TableProps } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DataType {
  id: number;
  avatar: string;
  name: string;
  email: string;
  address?: string | null;
  familyName?: string | null;
  isBelongToTemple: boolean;
  rejectReason?: string | null;
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
  createdAt: Date;
  endDateBooking: Date;
}
type EventParticipantTableProps = {
  eventId: number;
  bookingStatus: EBookingStatus;
  isBelongToTemple: boolean;
};

const EventParticipantTable: React.FC<EventParticipantTableProps> = ({
  eventId,
  bookingStatus,
  isBelongToTemple,
}) => {
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const { data, loading } = useGetEventParticipantsQuery({
    variables: {
      page,
      take: TAKE,
      bookingStatus,
      eventId,
      name,
      email,
      address,
      familyName,
      isBelongToTemple,
      orderBy,
    },
    fetchPolicy: "no-cache",
  });
  const { localeText } = useTrans();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: localeText.event.avatar,
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        <Image
          className="object-contain"
          src={avatar}
          alt={localeText.event.avatar}
          fill
        />
      ),
      width: 84,
    },
    {
      title: localeText.event.participant.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span>{name}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
    },
    {
      title: localeText.event.participant.email,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span>{email}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setEmail} />
      ),
    },
    {
      title: localeText.event.participant.address,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) => <span>{address}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setAddress} />
      ),
    },
    {
      title: localeText.event.participant.familyName,
      key: "familyName",
      dataIndex: "familyName",
      align: "center",
      render: (familyName) => <span>{familyName}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setFamilyName} />
      ),
    },
    {
      title: localeText.event.participant.createdAt,
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => (
        <span>{dayjs(createdAt).format(formatDate.YYYY_MM_DD_HH_MM)}</span>
      ),
      width: 116,
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(orderBy, setOrderBy, "createdAt", sortOrder),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleSortByColumn(orderBy, setOrderBy, "createdAt"),
      }),
      showSorterTooltip: false,
    },
    {
      title: localeText.event.participant.belongsToTemple,
      key: "isBelongToTemple",
      dataIndex: "isBelongToTemple",
      align: "center",
      render: (isBelongToTemple) => <Checkbox checked={isBelongToTemple} />,
      width: 76,
    },
    {
      title: localeText.event.action,
      key: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <EventParticipantListActions
          eventParticipantId={record.id}
          name={record.name}
          bookingStatus={bookingStatus}
          rejectReason={record.rejectReason}
          approverName={record.approverName}
          checkInAt={record.checkInAt}
          updatedAt={record.updatedAt}
          endDateBooking={record.endDateBooking}
        />
      ),
      width: 116,
    },
  ];

  useEffect(() => {
    if (data?.getEventParticipants.data?.data) {
      setDataSource(
        data.getEventParticipants.data?.data.map((item) => ({
          id: item.id,
          avatar: item.user.userDetail.avatar,
          email: item.user.email,
          name: item.user.userDetail.name,
          address: item.user.userDetail.address,
          familyName: item.familyName,
          isBelongToTemple: item.isBelongToTemple,
          createdAt: item.createdAt,
          rejectReason: item.rejectReason,
          approverName: item.approver?.userDetail.name,
          checkInAt: item.checkInAt,
          updatedAt: item.updatedAt,
          endDateBooking: item.event.endDateBooking,
        }))
      );

      setTotalItems(data.getEventParticipants.data?.totalItems);
    }
  }, [data]);

  useEffect(() => {
    setPage(PAGE);
  }, [bookingStatus]);

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
        scroll={{ x: 1300 }}
      />
    </>
  );
};

export default EventParticipantTable;
