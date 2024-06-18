import FilterCheckboxInput from "@/components/Atoms/FilterCheckboxInput";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import ParticipantTexts from "@/components/Atoms/ParticipantTexts";
import UpdateEventButton from "@/components/Organisms/UpdateEventButton";
import {
  ERole,
  OrderBy,
  TempleGetEventsDocument,
  useTempleGetEventsQuery,
  useUpdateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { DeleteOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons";
import { Checkbox, Popconfirm, Table, TableProps, Tooltip } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type EventManagementTableProps = {
  filter: {
    ended?: boolean;
  };
};

// TODO add priority, check-in count
interface DataType {
  id: number;
  avatar: string;
  name: string;
  startDateBooking: Date;
  endDateBooking: Date;
  startDateEvent: Date;
  endDateEvent: Date;
  isFreeOpen: boolean;
  eventParticipantTypes: {
    role: ERole;
  }[];
  bookingParticipant: number;
  currentParticipant: number;
  checkInParticipant: number;
  maxParticipant?: number | null | undefined;
  createdAt: Date;
}

const EventManagementTable: React.FC<EventManagementTableProps> = ({
  filter,
}) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { localeText } = useTrans();
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(PAGE);
  const router = useRouter();
  const [updateEvent] = useUpdateEventMutation();
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const [name, setName] = useState("");

  const handleCancelEvent = async (id: number) => {
    await updateEvent({
      variables: {
        updateEventInput: {
          id,
          isDeleted: true,
        },
      },
      onCompleted: () => {
        router.push("/event/temple");
        messageApi.success(localeText.event.cancelEventSuccessMessage);
      },
      onError: () => {
        messageApi.error(localeText.event.cancelEventFailMessage);
      },
      refetchQueries: [TempleGetEventsDocument],
    });
  };

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
        <FilterSearchInput setKeyword={setName} {...props} />
      ),
      width: 200,
    },
    {
      title: localeText.event.createdAt,
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (createdAt) => (
        <span>{dayjs(createdAt).format(formatDate.HH_mm_DD_MM_YYYY)}</span>
      ),
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(orderBy, setOrderBy, "createdAt", sortOrder),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleSortByColumn(orderBy, setOrderBy, "createdAt"),
      }),
      showSorterTooltip: false,
      width: 116,
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
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "startDateEvent"),
          }),
          showSorterTooltip: false,
          width: 116,
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
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "endDateEvent"),
          }),
          showSorterTooltip: false,
          width: 116,
        },
      ],
    },
    {
      title: localeText.event.isFreeOpen,
      key: "isFreeOpen",
      dataIndex: "isFreeOpen",
      align: "center",
      render: (isFreeOpen) => <Checkbox checked={isFreeOpen} />,
      width: 84,
    },
    {
      title: localeText.event.bookingTime,
      children: [
        {
          title: localeText.event.startTime,
          key: "startDateBooking",
          dataIndex: "startDateBooking",
          align: "center",
          render: (startDateBooking) =>
            startDateBooking && (
              <span>
                {dayjs(startDateBooking).format(formatDate.HH_mm_DD_MM_YYYY)}
              </span>
            ),
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "startDateBooking",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "startDateBooking"),
          }),
          showSorterTooltip: false,
          width: 116,
        },
        {
          title: localeText.event.endTime,
          key: "endDateBooking",
          dataIndex: "endDateBooking",
          align: "center",
          render: (endDateBooking) =>
            endDateBooking && (
              <span>
                {dayjs(endDateBooking).format(formatDate.HH_mm_DD_MM_YYYY)}
              </span>
            ),
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "endDateBooking",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "endDateBooking"),
          }),
          showSorterTooltip: false,
          width: 116,
        },
      ],
    },
    {
      title: localeText.event.participants,
      key: "eventParticipantTypes",
      dataIndex: "eventParticipantTypes",
      align: "center",
      render: (eventParticipantTypes) => (
        <ParticipantTexts
          eventParticipantTypes={eventParticipantTypes}
          localeText={localeText}
        />
      ),
    },
    {
      title: localeText.event.bookingParticipant,
      key: "bookingParticipant",
      dataIndex: "bookingParticipant",
      align: "center",
      render: (bookingParticipant, record) =>
        record.maxParticipant && <span>{bookingParticipant}</span>,
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(
            orderBy,
            setOrderBy,
            "bookingParticipant",
            sortOrder
          ),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () =>
          handleSortByColumn(orderBy, setOrderBy, "bookingParticipant"),
      }),
      showSorterTooltip: false,
      width: 80,
    },
    {
      title: localeText.event.participantCount,
      key: "currentParticipant",
      dataIndex: "currentParticipant",
      align: "center",
      render: (currentParticipant, record) =>
        record.maxParticipant && (
          <span>
            {currentParticipant}/{record.maxParticipant}
          </span>
        ),
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(
            orderBy,
            setOrderBy,
            "currentParticipant",
            sortOrder
          ),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () =>
          handleSortByColumn(orderBy, setOrderBy, "currentParticipant"),
      }),
      showSorterTooltip: false,
      width: 120,
    },
    {
      title: localeText.event.checkInParticipant,
      key: "checkInParticipant",
      dataIndex: "checkInParticipant",
      align: "center",
      render: (checkInParticipant, record) =>
        record.maxParticipant && (
          <span>
            {checkInParticipant}/{record.maxParticipant}
          </span>
        ),
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(
            orderBy,
            setOrderBy,
            "checkInParticipant",
            sortOrder
          ),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () =>
          handleSortByColumn(orderBy, setOrderBy, "checkInParticipant"),
      }),
      showSorterTooltip: false,
      width: 80,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      fixed: "right",
      width: 100,
      onCell: () => ({
        onClick: (e) => e.stopPropagation(),
        style: { cursor: "default" },
      }),
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title={localeText.event.participantList}>
            <TeamOutlined
              className="text-blue-400 text-xl cursor-pointer"
              onClick={() => router.push(`${record.id}/participant`)}
            />
          </Tooltip>
          {new Date(record.startDateEvent) > new Date() && (
            <UpdateEventButton id={record.id} />
          )}
          <Tooltip placement="top" title={localeText.event.cancelEvent}>
            <Popconfirm
              title={localeText.event.cancelEventPopConfirm.title}
              description={localeText.event.cancelEventPopConfirm.description}
              onConfirm={() => handleCancelEvent(record.id)}
              okText={localeText.OK}
              cancelText={localeText.cancel}
            >
              <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const { loading } = useTempleGetEventsQuery({
    variables: {
      page: page,
      take: TAKE,
      ...filter,
      orderBy,
      name,
    },
    onCompleted: (data) => {
      if (data?.templeGetEvents.data) {
        setDataSource(
          data.templeGetEvents.data.data.map((event) => ({
            id: event.id,
            avatar: event.avatar,
            name: event.name,
            isFreeOpen: event.isFreeOpen,
            startDateBooking: event.startDateBooking,
            endDateBooking: event.endDateBooking,
            startDateEvent: event.startDateEvent,
            endDateEvent: event.endDateEvent,
            eventParticipantTypes: event.eventParticipantTypes,
            bookingParticipant: event.bookingParticipant,
            currentParticipant: event.currentParticipant,
            checkInParticipant: event.checkInParticipant,
            maxParticipant: event.maxParticipant,
            createdAt: event.createdAt,
          }))
        );
        setTotalItems(data.templeGetEvents.data.totalItems);
      }
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

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
        scroll={{ x: 1480 }}
      />
    </>
  );
};

export default EventManagementTable;
