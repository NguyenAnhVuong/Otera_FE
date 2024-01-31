"use client";
import {
  ERole,
  EStatus,
  GetDeathAnniversariesDocument,
  useGetDeathAnniversariesQuery,
  useUpdateStatusDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";
import { getStatusText } from "@/utils/helper";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  status: EStatus;
}

type Props = {};

const { RangePicker } = DatePicker;

const DeathAnniversary = (props: Props) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const authUser = useAppSelector((state) => state.auth);

  const [deathAnniversary, setDeathAnniversary] = useState<DataType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [form] = Form.useForm();
  const { data } = useGetDeathAnniversariesQuery({
    variables: {
      getDeathAnniversariesInput: {
        // isPending: true,
      },
    },
  });

  const [udpateStatusDeathAnniversary] =
    useUpdateStatusDeathAnniversaryMutation();

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
            <span>{dayjs(desiredStartTime).format("YYYY-MM-DD HH:mm")}</span>
          ),
        },
        {
          title: "Kết thúc",
          key: "desiredEndTime",
          dataIndex: "desiredEndTime",
          align: "center",
          render: (desiredEndTime) => (
            <span>{dayjs(desiredEndTime).format("YYYY-MM-DD HH:mm")}</span>
          ),
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
              <span>{dayjs(actualStartTime).format("YYYY-MM-DD HH:mm")}</span>
            ),
        },
        {
          title: "Kết thúc",
          key: "actualEndTime",
          dataIndex: "actualEndTime",
          align: "center",
          render: (actualEndTime) =>
            actualEndTime && (
              <span>{dayjs(actualEndTime).format("YYYY-MM-DD HH:mm")}</span>
            ),
        },
      ],
    },
    {
      title: "Livestream",
      key: "isLiveStream",
      dataIndex: "isLiveStream",
      align: "center",
      render: (isLiveStream) => <span>{isLiveStream ? "Có" : "Không"}</span>,
    },
    {
      title: "Link livestream",
      key: "linkLiveStream",
      dataIndex: "linkLiveStream",
      align: "center",
      render: (linkLiveStream) => <span>{linkLiveStream}</span>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (status) => <span>{getStatusText(status)}</span>,
    },
    {
      title: "Hành động",
      dataIndex: "status",
      key: "action",
      align: "center",
      render: (status, record) =>
        status === EStatus.Pending ? (
          <div className="min-w-[40px] flex justify-between">
            <Tooltip placement="top" title={"Đồng ý"}>
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
            <Tooltip placement="top" title={"Từ chối"}>
              <CloseOutlined
                className="text-red-500 text-xl cursor-pointer"
                disabled={status !== EStatus.Pending}
                onClick={() => handleRejectDeathAnniversary(record.key)}
              />
            </Tooltip>
          </div>
        ) : (
          <></>
        ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    if (!deathAnniversary) return;
    const updateStatusDeathAnniversaryInput = {
      id: deathAnniversary.key,
      actualStartTime: new Date(deathAnniversary.desiredStartTime).setHours(
        values.actualTime[0].$H,
        values.actualTime[0].$m
      ),
      actualEndTime: new Date(deathAnniversary.desiredEndTime).setHours(
        values.actualTime[1].$H,
        values.actualTime[1].$m
      ),
      status: EStatus.Approved,
      linkLiveStream: values.linkLiveStream,
    };

    const { data } = await udpateStatusDeathAnniversary({
      variables: {
        updateStatusDeathAnniversaryInput,
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

    if (data && !data.updateStatusDeathAnniversary.errorCode) {
      setIsModalOpen(false);
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleRejectDeathAnniversary = async (id: number) => {
    const updateStatusDeathAnniversaryInput = {
      id,
      status: EStatus.Rejected,
    };

    const { data } = await udpateStatusDeathAnniversary({
      variables: {
        updateStatusDeathAnniversaryInput,
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

    if (data && !data.updateStatusDeathAnniversary.errorCode) {
      messageApi.open({
        type: "success",
        content: "Từ chối thành công!",
      });
    }
  };

  useEffect(() => {
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
        }))
      );
    }
  }, [data]);

  return (
    <div className="py-header">
      <Table
        columns={columns.filter(
          (column) =>
            (column.key === "action" && authUser.role === ERole.TempleAdmin) ||
            column.key !== "action"
        )}
        dataSource={dataSource}
      />
      <Modal
        className=""
        title="Thời gian có thể tổ chức thực tế"
        open={isModalOpen}
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
    </div>
  );
};

export default DeathAnniversary;
