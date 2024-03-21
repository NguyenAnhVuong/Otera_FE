import { DatePicker, Form, FormInstance, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
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
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };

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
      });
    }
  }, [data, form]);

  return (
    <div>
      {openButton}
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="flex justify-center"
        cancelText="Hủy"
        okText="Đăng ký"
      >
        <Form
          // name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Thời gian mong muốn"
            name="desiredTime"
            rules={[
              { required: true, message: "Please input your desiredTime!" },
            ]}
          >
            <RangePicker
              picker="time"
              format="HH:mm"
              placeholder={["Bắt đầu", "Kết thúc"]}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <TextArea rows={4} className="w-[320px]" />
          </Form.Item>
          <Form.Item
            label="Tổ chức livestream"
            name="isLiveStream"
            rules={[
              { required: true, message: "Please input your isLiveStream!" },
            ]}
            // initialValue={false}
          >
            <Radio.Group>
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeathAnniversaryInforModal;
