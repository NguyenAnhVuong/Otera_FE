import CopyBox from "@/components/Atoms/CopyBox";
import DeathAnniversaryStatus from "@/components/Atoms/DeathAnniversaryStatus";
import FilterCheckboxInput from "@/components/Atoms/FilterCheckboxInput";
import FilterSearchInput from "@/components/Atoms/FilterSearchInput";
import Loading from "@/components/Atoms/Loading";
import WatchLiveStreamButton from "@/components/Atoms/WatchLiveStreamButton";
import DeathAnniversaryType from "@/components/Molecules/DeathAnniversaryType";
import FamilyDeathAnniversaryActions from "@/components/Molecules/FamilyDeathAnniversaryActions";
import Offerings from "@/components/Molecules/Offerings";
import UserPopover from "@/components/Molecules/UserPopover";
import {
  EDeathAnniversaryStatus,
  EDeathAnniversaryType,
  Offering,
  OrderBy,
  useFamilyGetDeathAnniversariesQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE, TAKE, formatDate } from "@/utils/constants";
import { handleSortByColumn } from "@/utils/helper";
import { Checkbox, Table, TableProps } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DataType {
  id: number;
  deceasedId: number;
  avatar: string;
  name: string;
  note?: string | null;
  creatorId: number;
  desiredStartTime: Date;
  desiredEndTime: Date;
  actualStartTime?: Date | null;
  actualEndTime?: Date | null;
  isLiveStream: boolean;
  linkLiveStream?: string | null;
  status: EDeathAnniversaryStatus;
  rejectReason?: string | null;
  enableUpdate: boolean;
  offeringIds: number[];
  deathAnniversaryType: EDeathAnniversaryType;
  tombAddress: string;
  readyImage?: string | null;
  finishedImage?: string | null;
  offerings: {
    id: number;
    name: string;
    image: string;
  }[];
  user: {
    id: number;
    name: string;
    avatar: string;
    email: string;
    phone?: string | null;
  };
}

type FamilyDeathAnniversaryTableProps = {
  status?: EDeathAnniversaryStatus | null;
};

const FamilyDeathAnniversaryTable: React.FC<
  FamilyDeathAnniversaryTableProps
> = ({ status }) => {
  const { localeText } = useTrans();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [page, setPage] = useState(PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [name, setName] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [tombAddress, setTombAddress] = useState("");
  const [deathAnniversaryTypes, setDeathAnniversaryTypes] = useState<
    EDeathAnniversaryType[]
  >([]);
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);
  const { loading } = useFamilyGetDeathAnniversariesQuery({
    variables: {
      page,
      take: TAKE,
      status,
      name,
      tombAddress,
      deathAnniversaryTypes,
      orderBy,
      requesterName,
    },
    onCompleted: (data) => {
      if (data) {
        setTotalItems(data.familyGetDeathAnniversaries.data.totalItems);
        const deathAnniversaries = data.familyGetDeathAnniversaries.data.data;
        setDataSource(
          deathAnniversaries.map((deathAnniversary) => ({
            id: deathAnniversary.id,
            deceasedId: deathAnniversary.deceased.id,
            avatar: deathAnniversary.deceased.userDetail.avatar,
            name: deathAnniversary.deceased.userDetail.name,
            note: deathAnniversary.note,
            desiredStartTime: new Date(deathAnniversary.desiredStartTime),
            desiredEndTime: new Date(deathAnniversary.desiredEndTime),
            actualStartTime: deathAnniversary.actualStartTime
              ? new Date(deathAnniversary.actualStartTime)
              : null,
            actualEndTime: deathAnniversary.actualEndTime
              ? new Date(deathAnniversary.actualEndTime)
              : null,
            isLiveStream: deathAnniversary.isLiveStream,
            linkLiveStream: deathAnniversary.linkLiveStream,
            status: deathAnniversary.status,
            rejectReason: deathAnniversary.rejectReason,
            enableUpdate: deathAnniversary.enableUpdate,
            readyImage: deathAnniversary.readyImage,
            finishedImage: deathAnniversary.finishedImage,
            offeringIds: deathAnniversary.deathAnniversaryOfferings.map(
              (deathAnniversaryOffering) => deathAnniversaryOffering.offeringId
            ),
            deathAnniversaryType: deathAnniversary.deathAnniversaryType,
            tombAddress: deathAnniversary.deceased.tombAddress,
            offerings: deathAnniversary.deathAnniversaryOfferings.map(
              (deathAnniversaryOffering) => ({
                id: deathAnniversaryOffering.offering.id,
                name: deathAnniversaryOffering.offering.name,
                image: deathAnniversaryOffering.offering.image,
              })
            ),
            user: {
              ...deathAnniversary.user.userDetail,
              email: deathAnniversary.user.email,
            },
            creatorId: deathAnniversary.creatorId,
          }))
        );
      }
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: localeText.deathAnniversary.avatar,
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 68,
      render: (avatar, record) => (
        <Link href={`/deceased/${record.deceasedId}`}>
          <Image
            className="object-contain"
            src={avatar}
            alt={localeText.deathAnniversary.avatar}
            fill
          />
        </Link>
      ),
    },
    {
      title: localeText.deceased.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 160,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setName} />
      ),
      render: (name, record) => (
        <Link href={`/deceased/${record.deceasedId}`}>
          <span className="text-black">{name}</span>
        </Link>
      ),
    },
    {
      title: localeText.deathAnniversary.tombAddress,
      dataIndex: "tombAddress",
      key: "tombAddress",
      align: "center",
      width: 132,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setTombAddress} />
      ),
    },
    {
      title: localeText.deathAnniversary.type,
      key: "deathAnniversaryType",
      dataIndex: "deathAnniversaryType",
      align: "center",
      width: 112,
      filterDropdown: (props) => (
        <FilterCheckboxInput
          {...props}
          setFilter={(filter) =>
            setDeathAnniversaryTypes(filter as EDeathAnniversaryType[])
          }
          options={[
            {
              label: localeText.deathAnniversary.firstAnniversary,
              value: EDeathAnniversaryType.FirstAnniversary,
            },
            {
              label: localeText.deathAnniversary.secondAnniversary,
              value: EDeathAnniversaryType.SecondAnniversary,
            },
            {
              label: localeText.deathAnniversary.regularAnniversary,
              value: EDeathAnniversaryType.RegularAnniversary,
            },
          ]}
        />
      ),
      render: (deathAnniversaryType) => (
        <DeathAnniversaryType deathAnniversaryType={deathAnniversaryType} />
      ),
    },

    {
      title: localeText.deathAnniversary.desire,
      children: [
        {
          title: localeText.deathAnniversary.start,
          key: "desiredStartTime",
          dataIndex: "desiredStartTime",
          align: "center",
          render: (desiredStartTime) => (
            <span>
              {dayjs(desiredStartTime).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "desiredStartTime",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "desiredStartTime"),
          }),
          showSorterTooltip: false,
        },
        {
          title: localeText.deathAnniversary.end,
          key: "desiredEndTime",
          dataIndex: "desiredEndTime",
          align: "center",
          render: (desiredEndTime) => (
            <span>
              {dayjs(desiredEndTime).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "desiredEndTime",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "desiredEndTime"),
          }),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: localeText.deathAnniversary.liveStream,
      key: "isLiveStream",
      dataIndex: "isLiveStream",
      align: "center",
      render: (isLiveStream) => (
        <Checkbox className="cursor-default" checked={isLiveStream} />
      ),
      width: 80,
      sorter: {
        compare: (a, b, sortOrder) =>
          handleSortByColumn(orderBy, setOrderBy, "isLiveStream", sortOrder),
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleSortByColumn(orderBy, setOrderBy, "isLiveStream"),
      }),
      showSorterTooltip: false,
    },
    {
      title: localeText.deathAnniversary.watchLiveStream,
      key: "linkLiveStream",
      dataIndex: "linkLiveStream",
      align: "center",
      width: 80,
      render: (linkLiveStream) =>
        linkLiveStream && (
          <div className="flex justify-center gap-2 items-center">
            <WatchLiveStreamButton linkLiveStream={linkLiveStream} />
            <CopyBox
              text={linkLiveStream}
              tooltip={localeText.deathAnniversary.copyLinkLiveStream}
            />
          </div>
        ),
    },
    {
      title: localeText.deathAnniversary.offering,
      key: "offerings",
      dataIndex: "offerings",
      align: "center",
      width: 96,
      render: (offerings: Offering[]) => <Offerings offerings={offerings} />,
    },
    {
      title: localeText.deathAnniversary.status,
      key: "status",
      dataIndex: "status",
      align: "center",
      width: 112,
      render: (status) => <DeathAnniversaryStatus status={status} />,
    },
    {
      title: localeText.deathAnniversary.reality,
      children: [
        {
          title: localeText.deathAnniversary.start,
          key: "actualStartTime",
          dataIndex: "actualStartTime",
          align: "center",
          render: (actualStartTime) =>
            actualStartTime && (
              <span>
                {dayjs(actualStartTime).format(formatDate.HH_mm_DD_MM_YYYY)}
              </span>
            ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "actualStartTime",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "actualStartTime"),
          }),
          showSorterTooltip: false,
        },
        {
          title: localeText.deathAnniversary.end,
          key: "actualEndTime",
          dataIndex: "actualEndTime",
          align: "center",
          render: (actualEndTime) =>
            actualEndTime && (
              <span>
                {dayjs(actualEndTime).format(formatDate.HH_mm_DD_MM_YYYY)}
              </span>
            ),
          width: 116,
          sorter: {
            compare: (a, b, sortOrder) =>
              handleSortByColumn(
                orderBy,
                setOrderBy,
                "actualEndTime",
                sortOrder
              ),
            multiple: 1,
          },
          onHeaderCell: () => ({
            onClick: () =>
              handleSortByColumn(orderBy, setOrderBy, "actualEndTime"),
          }),
          showSorterTooltip: false,
        },
      ],
    },
    {
      title: localeText.deathAnniversary.note,
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    {
      title: localeText.deathAnniversary.requester,
      dataIndex: "user",
      key: "user",
      align: "center",
      render: (user) => <UserPopover user={user} />,
      filterDropdown: (props) => (
        <FilterSearchInput {...props} setKeyword={setRequesterName} />
      ),
      width: 60,
    },
    {
      title: localeText.deathAnniversary.action,
      dataIndex: "status",
      key: "action",
      align: "center",
      fixed: "right",
      width: 100,
      render: (status, record) => (
        <FamilyDeathAnniversaryActions
          id={record.id}
          enableUpdate={record.enableUpdate}
          status={status}
          rejectReason={record.rejectReason}
          desiredStartTime={record.desiredStartTime}
          desiredEndTime={record.desiredEndTime}
          note={record.note}
          isLiveStream={record.isLiveStream}
          offeringIds={record.offeringIds}
          deathAnniversaryType={record.deathAnniversaryType}
          readyImage={record.readyImage}
          finishedImage={record.finishedImage}
          creatorId={record.creatorId}
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
        scroll={{ x: 1600 }}
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

export default FamilyDeathAnniversaryTable;
