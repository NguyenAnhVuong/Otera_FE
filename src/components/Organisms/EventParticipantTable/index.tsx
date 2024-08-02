import Family from "@/components/Atoms/Family";
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
  phone?: string;
  address?: string | null;
  familyName?: string | null;
  familyCode?: string | null;
  isFollowing: boolean;
  rejectReason?: string | null;
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
  createdAt: Date;
  endDateBooking: Date;
  bookingStatus: EBookingStatus;
}
type EventParticipantTableProps = {
  eventId: number;
  bookingStatus: EBookingStatus | null;
  isFollowing: boolean;
  isCheckIn?: boolean;
};

const EventParticipantTable: React.FC<EventParticipantTableProps> = ({
  eventId,
  bookingStatus,
  isFollowing,
  isCheckIn,
}) => {
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [familyKeyword, setFamilyKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const { loading } = useGetEventParticipantsQuery({
    variables: {
      page,
      take: TAKE,
      bookingStatus,
      eventId,
      name,
      email,
      address,
      familyKeyword,
      isFollowing,
      orderBy,
      isCheckIn,
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data?.getEventParticipants.data?.data) {
        setDataSource(
          data.getEventParticipants.data?.data.map((item) => ({
            id: item.id,
            avatar: item.user.userDetail.avatar,
            email: item.user.email,
            name: item.user.userDetail.name,
            address: item.user.userDetail.address,
            familyName: item.familyName,
            familyCode: item.familyCode,
            isFollowing: item.isFollowing,
            createdAt: item.createdAt,
            rejectReason: item.rejectReason,
            approverName: item.approver?.userDetail.name,
            checkInAt: item.checkInAt,
            updatedAt: item.updatedAt,
            endDateBooking: item.event.endDateBooking,
            bookingStatus: item.bookingStatus,
          }))
        );
        setTotalItems(data.getEventParticipants.data?.totalItems);
      }
    },
    notifyOnNetworkStatusChange: true,
  });
  const { localeText } = useTrans();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: localeText.event.avatar,
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            className="object-cover static "
            src={avatar}
            alt={localeText.event.avatar}
            fill
          />
        </div>
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
      title: localeText.event.participant.phone,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: 120,
      render: (phone) => <span>{phone}</span>,
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
      title: localeText.deceased.family,
      dataIndex: "family",
      key: "family",
      align: "center",
      width: 160,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setFamilyKeyword} />
      ),
      render: (_, record) => (
        <div>
          <Family name={record.familyName} code={record.familyCode} />
        </div>
      ),
    },
    {
      title: localeText.event.participant.createdAt,
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => (
        <span>{dayjs(createdAt).format(formatDate.HH_mm_DD_MM_YYYY)}</span>
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
      title: localeText.event.participant.isFollowing,
      key: "isFollowing",
      dataIndex: "isFollowing",
      align: "center",
      render: (isFollowing) => <Checkbox checked={isFollowing} />,
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
          bookingStatus={record.bookingStatus}
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
