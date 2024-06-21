import Loading from "@/components/Atoms/Loading";
import RejectDeathAnniversaryModal from "@/components/Atoms/RejectDeathAnniversaryModal";
import {
  EDeathAnniversaryStatus,
  EDeathAnniversaryType,
  TempleGetDeathAnniversariesDocument,
  useTempleUpdateDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import RejectInforModal from "@/components/Molecules/RejectInforModal";
import ReadyProofModal from "@/components/Molecules/ReadyProofModal";
import FinishedProofModal from "@/components/Molecules/FinishedProofModal";

type TempleDeathAnniversaryActionsProps = {
  id: number;
  enableUpdate: boolean;
  status: EDeathAnniversaryStatus;
  rejectReason?: string | null;
  desiredStartTime: Date;
  desiredEndTime: Date;
  note?: string | null;
  isLiveStream: boolean;
  offeringIds: number[];
  deathAnniversaryType: EDeathAnniversaryType;
  readyImage?: string | null;
  actualEndTime?: Date | null;
  finishedImage?: string | null;
};

const { RangePicker } = DatePicker;

const TempleDeathAnniversaryActions: React.FC<
  TempleDeathAnniversaryActionsProps
> = ({
  id,
  status,
  desiredStartTime,
  desiredEndTime,
  isLiveStream,
  rejectReason,
  readyImage,
  actualEndTime,
  finishedImage,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [rejectDeathAnniversaryId, setRejectDeathAnniversaryId] = useState<
    number | null
  >(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [templeUpdateDeathAnniversary, { loading }] =
    useTempleUpdateDeathAnniversaryMutation({
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
      refetchQueries: [TempleGetDeathAnniversariesDocument],
    });

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
    const templeUpdateDeathAnniversaryInput = {
      id,
      actualStartTime: new Date(desiredStartTime).setHours(
        values.actualTime[0].$H,
        values.actualTime[0].$m
      ),
      actualEndTime: new Date(desiredEndTime).setHours(
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

  switch (status) {
    case EDeathAnniversaryStatus.Pending:
      return (
        <div className="flex justify-center gap-2 items-center">
          {loading && <Loading />}
          <Tooltip placement="top" title={localeText.deathAnniversary.approve}>
            <CheckOutlined
              className="text-green-400 text-xl cursor-pointer"
              onClick={() => {
                showModal();
                form.setFieldsValue({
                  actualTime: [dayjs(desiredStartTime), dayjs(desiredEndTime)],
                });
              }}
              disabled={status !== EDeathAnniversaryStatus.Pending}
            />
          </Tooltip>
          <Tooltip placement="top" title={localeText.deathAnniversary.reject}>
            <CloseOutlined
              className="text-red-500 text-xl cursor-pointer"
              disabled={status !== EDeathAnniversaryStatus.Pending}
              onClick={() => setRejectDeathAnniversaryId(id)}
            />
          </Tooltip>
          <Modal
            className=""
            title={localeText.deathAnniversary.actual}
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
                label={localeText.deathAnniversary.actualTime}
                name="actualTime"
                rules={[
                  {
                    required: true,
                    message: localeText.validateMessages.required(
                      localeText.deathAnniversary.actualTime
                    ),
                  },
                ]}
              >
                <RangePicker className="w-full" picker="time" format="HH:mm" />
              </Form.Item>
              {isLiveStream && (
                <Form.Item
                  label={localeText.deathAnniversary.linkLiveStream}
                  name="linkLiveStream"
                  rules={[
                    {
                      required: true,
                      message: localeText.validateMessages.required(
                        localeText.deathAnniversary.linkLiveStream
                      ),
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
    case EDeathAnniversaryStatus.Approved:
      return <ReadyProofModal deathAnniversaryId={id} />;
    case EDeathAnniversaryStatus.Ready:
      return (
        <div className="flex justify-center gap-2 items-center">
          <ReadyProofModal
            deathAnniversaryId={id}
            proofImage={readyImage}
            isReadOnly
          />
          <FinishedProofModal
            deathAnniversaryId={id}
            readyImage={readyImage}
            actualEndTime={actualEndTime}
          />
        </div>
      );
    case EDeathAnniversaryStatus.Finished:
      return (
        <FinishedProofModal
          deathAnniversaryId={id}
          readyImage={readyImage}
          finishedImage={finishedImage}
          isReadOnly
        />
      );
    case EDeathAnniversaryStatus.Rejected:
      return (
        <div>{rejectReason && <RejectInforModal infor={rejectReason} />}</div>
      );

    default:
      return <></>;
  }
};

export default TempleDeathAnniversaryActions;
