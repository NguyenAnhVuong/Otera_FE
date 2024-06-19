"use client";
import CopyBox from "@/components/Atoms/CopyBox";
import DeathAnniversaryStatus from "@/components/Atoms/DeathAnniversaryStatus";
import Loading from "@/components/Atoms/Loading";
import RejectDeathAnniversaryModal from "@/components/Atoms/RejectDeathAnniversaryModal";
import DeathAnniversaryInforModal from "@/components/Molecules/DeathAnniversaryInforModal";
import RejectInforModal from "@/components/Molecules/RejectInforModal";
import {
  EDeathAnniversaryStatus,
  EDeathAnniversaryType,
  ERole,
  EStatus,
  GetDeathAnniversariesDocument,
  useCancelDeathAnniversaryMutation,
  useFamilyUpdateDeathAnniversaryMutation,
  useGetDeathAnniversariesQuery,
  useTempleUpdateDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DataType {
  key: number;
  avatar: string;
  name: string;
  note?: string | null;
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
}

const { RangePicker } = DatePicker;
// TODO pagination
const DeathAnniversary = () => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const authUser = useAppSelector((state) => state.auth);
  const { localeText } = useTrans();

  const [deathAnniversary, setDeathAnniversary] = useState<DataType>();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rejectDeathAnniversaryId, setRejectDeathAnniversaryId] = useState<
    number | null
  >(null);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [form] = Form.useForm();
  // TODO Pagination, filter
  const { loading } = useGetDeathAnniversariesQuery({
    variables: {
      getDeathAnniversariesInput: {
        // isPending: true,
      },
    },
    onCompleted: (data) => {
      if (data) {
        const deathAnniversaries = data.getDeathAnniversaries.data;
        setDataSource(
          deathAnniversaries.map((deathAnniversary) => ({
            key: deathAnniversary.id,
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
            offeringIds: deathAnniversary.deathAnniversaryOfferings.map(
              (deathAnniversaryOffering) => deathAnniversaryOffering.offeringId
            ),
            deathAnniversaryType: deathAnniversary.deathAnniversaryType,
          }))
        );
      }
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });
  const [
    templeUpdateDeathAnniversary,
    { loading: templeUpdateDeathAnniversaryLoading },
  ] = useTempleUpdateDeathAnniversaryMutation({
    onCompleted: () => {
      setIsApproveModalOpen(false);
      form.resetFields();
      messageApi.open({
        type: "success",
        content: localeText.deathAnniversary.approveSuccessMessage,
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: localeText.deathAnniversary.approveFailMessage,
      });
    },
    refetchQueries: [GetDeathAnniversariesDocument],
  });

  const [familyUpdateDeathAnniversary] =
    useFamilyUpdateDeathAnniversaryMutation({
      refetchQueries: [GetDeathAnniversariesDocument],
      onCompleted: () => {
        setIsApproveModalOpen(false);
        form.resetFields();
        messageApi.open({
          type: "success",
          content:
            localeText.deathAnniversary.updateDeathAnniversarySuccessMessage,
        });
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content:
            localeText.deathAnniversary.updateDeathAnniversaryFailMessage,
        });
      },
    });

  const [cancelDeathAnniversary] = useCancelDeathAnniversaryMutation();

  const handleEditDeathAnniversary = async (values: any) => {
    if (!deathAnniversary) return;
    const updateDeathAnniversaryInput = {
      id: deathAnniversary.key,
      desiredStartTime: new Date(deathAnniversary.desiredStartTime).setHours(
        values.desiredTime[0].$H,
        values.desiredTime[0].$m
      ),
      desiredEndTime: new Date(deathAnniversary.desiredEndTime).setHours(
        values.desiredTime[1].$H,
        values.desiredTime[1].$m
      ),
      note: values.note,
      offeringIds: values.offeringIds,
      isLiveStream: values.isLiveStream,
      deathAnniversaryType: values.deathAnniversaryType,
    };

    await familyUpdateDeathAnniversary({
      variables: {
        updateDeathAnniversaryInput,
      },
    });
  };

  const handleCancelDeathAnniversary = async (id: number) => {
    const { data } = await cancelDeathAnniversary({
      variables: {
        cancelDeathAnniversaryInput: {
          id,
        },
      },
      refetchQueries: [
        {
          query: GetDeathAnniversariesDocument,
          variables: {
            getDeathAnniversariesInput: {
              // isPending: true,
            },
          },
        },
      ],
    });

    if (data && !data.cancelDeathAnniversary.errorCode) {
      messageApi.open({
        type: "success",
        content:
          localeText.deathAnniversary.cancelDeathAnniversarySuccessMessage,
      });
    } else {
      messageApi.open({
        type: "error",
        content: localeText.deathAnniversary.cancelDeathAnniversaryFailMessage,
      });
    }
  };

  // TODO add column requestor
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        <Image
          className="object-contain"
          src={avatar}
          alt="Ảnh đại diện"
          fill
        />
      ),
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    {
      title: "Mong muốn",
      children: [
        {
          title: "Bắt đầu",
          key: "desiredStartTime",
          dataIndex: "desiredStartTime",
          align: "center",
          render: (desiredStartTime) => (
            <span>
              {dayjs(desiredStartTime).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
        },
        {
          title: "Kết thúc",
          key: "desiredEndTime",
          dataIndex: "desiredEndTime",
          align: "center",
          render: (desiredEndTime) => (
            <span>
              {dayjs(desiredEndTime).format(formatDate.HH_mm_DD_MM_YYYY)}
            </span>
          ),
          width: 116,
        },
      ],
    },
    {
      title: "Thực tế",
      children: [
        {
          title: "Bắt đầu",
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
        },
        {
          title: "Kết thúc",
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
        },
      ],
    },
    {
      title: "LiveStream",
      key: "isLiveStream",
      dataIndex: "isLiveStream",
      align: "center",
      render: (isLiveStream) => <span>{isLiveStream ? "Có" : "Không"}</span>,
    },
    {
      title: localeText.deathAnniversary.watchLiveStream,
      key: "linkLiveStream",
      dataIndex: "linkLiveStream",
      align: "center",
      render: (linkLiveStream) =>
        linkLiveStream && (
          <div className="flex flex-col items-center">
            <Link href={linkLiveStream} target="_blank">
              {localeText.deathAnniversary.watchLiveStream}
            </Link>
            <CopyBox
              text={linkLiveStream}
              tooltip={localeText.deathAnniversary.copyLinkLiveStream}
            />
          </div>
        ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (status, record) =>
        status === EStatus.Rejected && record.rejectReason ? (
          <RejectInforModal infor={record.rejectReason} />
        ) : (
          <DeathAnniversaryStatus status={status} />
        ),
    },
    // TODO hidden when expired
    {
      title: "Hành động",
      dataIndex: "status",
      key: "action",
      align: "center",
      render: (status, record) =>
        status === EStatus.Pending && authUser.role === ERole.TempleAdmin ? (
          <div className="min-w-[40px] flex justify-between">
            <Tooltip
              placement="top"
              title={localeText.deathAnniversary.approve}
            >
              <CheckOutlined
                className="text-green-400 text-xl cursor-pointer"
                onClick={() => {
                  setDeathAnniversary(record);
                  showModal();
                  form.setFieldsValue({
                    actualTime: [
                      dayjs(record.desiredStartTime),
                      dayjs(record.desiredEndTime),
                    ],
                  });
                }}
                disabled={status !== EStatus.Pending}
              />
            </Tooltip>
            <Tooltip placement="top" title={localeText.deathAnniversary.reject}>
              <CloseOutlined
                className="text-red-500 text-xl cursor-pointer"
                disabled={status !== EStatus.Pending}
                onClick={() => setRejectDeathAnniversaryId(record.key)}
              />
            </Tooltip>
          </div>
        ) : (authUser.role === ERole.FamilyAdmin ||
            authUser.role === ERole.FamilyMember) &&
          record.enableUpdate &&
          status !== EStatus.Approved ? (
          <div className="min-w-[40px] flex justify-between">
            <DeathAnniversaryInforModal
              title={localeText.deathAnniversary.updateDeathAnniversary}
              isModalOpen={isEditModalOpen}
              setIsModalOpen={setIsEditModalOpen}
              handleSubmitForm={handleEditDeathAnniversary}
              data={{
                desiredStartTime:
                  deathAnniversary?.desiredStartTime ?? record.desiredStartTime,
                desiredEndTime:
                  deathAnniversary?.desiredEndTime ?? record.desiredEndTime,
                note: deathAnniversary?.note ?? record.note,
                isLiveStream:
                  deathAnniversary?.isLiveStream ?? record.isLiveStream,
                offeringIds:
                  deathAnniversary?.offeringIds ?? record.offeringIds,
                deathAnniversaryType:
                  deathAnniversary?.deathAnniversaryType ??
                  record.deathAnniversaryType,
              }}
              openButton={
                <Tooltip
                  placement="top"
                  title={localeText.deathAnniversary.editInfo}
                >
                  <EditOutlined
                    className="text-green-400 text-xl cursor-pointer"
                    onClick={() => {
                      setDeathAnniversary(record);
                      setIsEditModalOpen(true);
                    }}
                    disabled={status !== EStatus.Pending}
                    size={20}
                  />
                </Tooltip>
              }
            />

            <Tooltip
              placement="top"
              title={localeText.deathAnniversary.cancelRegister}
            >
              <Popconfirm
                title={
                  localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                    .title
                }
                description={
                  localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                    .description
                }
                onConfirm={() => handleCancelDeathAnniversary(record.key)}
                okText={localeText.OK}
                cancelText={localeText.cancel}
              >
                <DeleteOutlined
                  className="text-red-500 text-xl h-fit cursor-pointer"
                  disabled={status !== EStatus.Pending}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        ) : (
          <></>
        ),
    },
  ];

  const showModal = () => {
    setIsApproveModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsApproveModalOpen(false);
  };

  const onFinish = async (values: any) => {
    if (!deathAnniversary) return;
    const templeUpdateDeathAnniversaryInput = {
      id: deathAnniversary.key,
      actualStartTime: new Date(deathAnniversary.desiredStartTime).setHours(
        values.actualTime[0].$H,
        values.actualTime[0].$m
      ),
      actualEndTime: new Date(deathAnniversary.desiredEndTime).setHours(
        values.actualTime[1].$H,
        values.actualTime[1].$m
      ),
      status: EDeathAnniversaryStatus.Approved,
      linkLiveStream: values.linkLiveStream,
    };
    await templeUpdateDeathAnniversary({
      variables: {
        templeUpdateDeathAnniversaryInput,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="py-header">
      {(loading || templeUpdateDeathAnniversaryLoading) && <Loading />}
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        className=""
        title="Thời gian có thể tổ chức thực tế"
        open={isApproveModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Hủy"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Thời gian thực tế"
            name="actualTime"
            rules={[
              { required: true, message: "Please input your desiredTime!" },
            ]}
          >
            <RangePicker className="w-full" picker="time" format="HH:mm" />
          </Form.Item>
          {deathAnniversary?.isLiveStream && (
            <Form.Item
              label="Link livestream"
              name="linkLiveStream"
              rules={[
                {
                  required: true,
                  message: "Please input your Link livestream!",
                },
              ]}
            >
              <Input className="w-full" placeholder="Link Google Meet" />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <RejectDeathAnniversaryModal
        rejectDeathAnniversaryId={rejectDeathAnniversaryId}
        handleCloseModal={() => setRejectDeathAnniversaryId(null)}
      />
    </div>
  );
};

export default DeathAnniversary;
