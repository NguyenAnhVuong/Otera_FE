"use client";
import useTrans from "@/hooks/useTrans";
import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

type RejectModalProps = {
  children: React.ReactElement;
  isReadOnly?: boolean;
  defaultRejectReason?: string | null;
  onSubmit?: (rejectReason: string) => Promise<void>;
  isRequired?: boolean;
};

type FieldType = {
  rejectReason: string;
};

const RejectModal: React.FC<RejectModalProps> = ({
  children,
  isReadOnly = false,
  defaultRejectReason,
  onSubmit = () => {},
  isRequired = false,
}) => {
  const { localeText } = useTrans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    if (!isReadOnly) {
      await onSubmit(values.rejectReason);
    }
  };

  const handleOk = async () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setIsModalOpen(true) })}
      <Modal
        title={localeText.event.rejected}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={localeText.OK}
        cancelText={localeText.cancel}
        cancelButtonProps={{
          style: { display: isReadOnly ? "none" : "" },
        }}
      >
        <Form
          name="rejectForm"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label={localeText.event.participant.rejectReason}
            name="rejectReason"
            rules={[
              {
                required: isRequired,
                message: localeText.validateMessages.required(
                  localeText.event.participant.rejectReason
                ),
              },
            ]}
          >
            <Input.TextArea
              readOnly={isReadOnly}
              disabled={isReadOnly}
              placeholder={localeText.event.participant.rejectReason}
              defaultValue={defaultRejectReason || undefined}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RejectModal;
