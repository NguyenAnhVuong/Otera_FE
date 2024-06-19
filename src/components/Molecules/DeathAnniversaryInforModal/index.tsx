import Loading from "@/components/Atoms/Loading";
import {
  EDeathAnniversaryType,
  useGetOfferingsQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { PAGE } from "@/utils/constants";
import {
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Modal,
  Radio,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect } from "react";

const { RangePicker } = DatePicker;

type DeathAnniversaryInforModalProps = {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleSubmitForm: (values: any) => void;
  openButton: React.ReactNode;
  data?: {
    desiredStartTime: Date;
    desiredEndTime: Date;
    note?: string | null;
    isLiveStream: boolean;
    offeringIds: number[];
    deathAnniversaryType: EDeathAnniversaryType;
  };
};

const DeathAnniversaryInforModal: React.FC<DeathAnniversaryInforModalProps> = ({
  title,
  isModalOpen,
  setIsModalOpen,
  handleSubmitForm,
  openButton,
  data,
}) => {
  const { localeText } = useTrans();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };

  const { data: offeringData, loading } = useGetOfferingsQuery({
    variables: {
      page: PAGE,
      take: 100,
    },
  });

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    handleSubmitForm(values);
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        desiredTime: [dayjs(data.desiredStartTime), dayjs(data.desiredEndTime)],
        note: data.note,
        isLiveStream: data.isLiveStream,
        offeringIds: data.offeringIds,
        deathAnniversaryType: data.deathAnniversaryType,
      });
    }
  }, [data, form]);

  return (
    <div>
      {loading && <Loading />}
      {openButton}
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="flex justify-center"
        cancelText={localeText.cancel}
        okText={localeText.request}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <div className="grid grid-cols-5">
            <Form.Item
              className="col-span-3"
              label={localeText.deathAnniversary.desiredTime}
              name="desiredTime"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deathAnniversary.desiredTime
                  ),
                },
              ]}
            >
              <RangePicker
                picker="time"
                format="HH:mm"
                placeholder={[localeText.start, localeText.end]}
              />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              label={localeText.deathAnniversary.organizeLivestream}
              name="isLiveStream"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.selectRequired(
                    localeText.deathAnniversary.organizeLivestream
                  ),
                },
              ]}
            >
              <Radio.Group>
                <Radio value={true}>{localeText.yes}</Radio>
                <Radio value={false}>{localeText.no}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <Form.Item
            className="text-center"
            label={localeText.deathAnniversary.type}
            name="deathAnniversaryType"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.deathAnniversary.type
                ),
              },
            ]}
          >
            <Radio.Group>
              <Radio value={EDeathAnniversaryType.FirstAnniversary}>
                {localeText.deathAnniversary.firstAnniversary}
              </Radio>
              <Radio value={EDeathAnniversaryType.SecondAnniversary}>
                {localeText.deathAnniversary.secondAnniversary}
              </Radio>
              <Radio value={EDeathAnniversaryType.RegularAnniversary}>
                {localeText.deathAnniversary.regularAnniversary}
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            className="text-center"
            label={localeText.deathAnniversary.offering}
            name="offeringIds"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.deathAnniversary.offering
                ),
              },
            ]}
          >
            <Checkbox.Group
              options={
                offeringData?.getOfferings.data.data.map((offering) => ({
                  label: (
                    <Tooltip className="w-8 h-8" title={offering.name}>
                      <Image
                        className="object-contain static"
                        src={offering.image}
                        fill
                        alt={offering.name}
                      />
                    </Tooltip>
                  ),
                  value: offering.id,
                })) ?? []
              }
            />
          </Form.Item>

          <Form.Item
            label={localeText.deathAnniversary.note}
            name="note"
            rules={[
              {
                max: 5000,
                message: localeText.validateMessages.max(5000),
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeathAnniversaryInforModal;
