import BookingStatus from "@/components/Atoms/BookingStatus";
import CopyBox from "@/components/Atoms/CopyBox";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import BookingEventsActions from "@/components/Molecules/BookingEventsActions";
import {
  EBookingStatus,
  OrderBy,
  useGetBookingEventsQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type BookingEventTableProps = {
  bookingStatus?: EBookingStatus | null;
};

interface DataType {
  id: number;
  avatar: string;
  name: string;
  startDateEvent: Date;
  endDateEvent: Date;
  address: string;
  code?: string | null;
  bookingStatus: EBookingStatus;
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
  rejectReason?: string | null;
  endDateBooking?: Date;
}

const BookingEventTable: React.FC<BookingEventTableProps> = ({
  bookingStatus,
}) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { localeText } = useTrans();
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(PAGE);
  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const { data, loading } = useGetBookingEventsQuery({
    variables: {
      page,
      take: TAKE,
      bookingStatus,
      name,
      address,
      orderBy,
    },
    onCompleted: (data) => {
      if (data?.getBookingEvents.data.data) {
        setDataSource(
          data?.getBookingEvents.data.data.map((event) => ({
            id: event.id,
            avatar: event.avatar,
            name: event.name,
            startDateEvent: event.startDateEvent,
            endDateEvent: event.endDateEvent,
            address: event.address,
            code: event.eventParticipants[0].code,
            bookingStatus: event.eventParticipants[0].bookingStatus,
            approverName: event.eventParticipants[0].approver?.userDetail.name,
            checkInAt: event.eventParticipants[0].checkInAt,
            updatedAt: event.eventParticipants[0].updatedAt,
            rejectReason: event.eventParticipants[0].rejectReason,
            endDateBooking: event.endDateBooking,
          }))
        );
        setTotalItems(data?.getBookingEvents.data.totalItems);
      }
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

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
      title: localeText.event.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => <span>{name}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
    },
    {
      title: localeText.event.address,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) => <span>{address}</span>,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setAddress} />
      ),
    },
    {
      title: localeText.event.eventTime,
      children: [
        {
          title: localeText.event.startTime,
          key: "startDateEvent",
          dataIndex: "startDateEvent",
          align: "center",
          render: (startDateEvent) => (
            <span>
              {dayjs(startDateEvent).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "startDateEvent",
                sortOrder
              ),
            multiple: 1,
          },
          showSorterTooltip: false,
        },
        {
          title: localeText.event.endTime,
          key: "endDateEvent",
          dataIndex: "endDateEvent",
          align: "center",
          render: (endDateEvent) => (
            <span>
              {dayjs(endDateEvent).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "endDateEvent",
                sortOrder
              ),
            multiple: 1,
          },
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: localeText.status,
      key: "bookingStatus",
      dataIndex: "bookingStatus",
      align: "center",
      render: (bookingStatus) => (
        <BookingStatus bookingStatus={bookingStatus} />
      ),
      width: 120,
    },
    {
      title: localeText.event.participant.code,
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (code) => (
        <>
          <span>{code}</span>
          {code && <CopyBox text={code} />}
        </>
      ),
      onCell: () => ({
        onClick: (e) => e.stopPropagation(),
        style: { cursor: "default" },
      }),
      width: 116,
    },
    {
      title: localeText.event.action,
      key: "action",
      align: "center",
      onCell: () => ({
        onClick: (e) => e.stopPropagation(),
        style: { cursor: "default" },
      }),
      render: (_, record) => (
        <BookingEventsActions
          eventId={record.id}
          bookingStatus={record.bookingStatus}
          approverName={record.approverName}
          checkInAt={record.checkInAt}
          updatedAt={record.updatedAt}
          rejectReason={record.rejectReason}
          endDateBooking={record.endDateBooking}
        />
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
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/event/${record.id}`);
            },
          };
        }}
        rowClassName={() => "cursor-pointer"}
      />
    </>
  );
};

export default BookingEventTable;
