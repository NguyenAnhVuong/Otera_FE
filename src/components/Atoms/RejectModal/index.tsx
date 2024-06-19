"use client";
import useTrans from "@/hooks/useTrans";
import { REJECT_REASON_MAX_LENGTH } from "@/utils/constants";
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
    if (!isReadOnly) {
      form
        .validateFields()
        .then(() => {
          form.submit();
          setIsModalOpen(false);
        })
        .catch((errors) => {
          // Errors in the fields
        });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
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
              {
                max: REJECT_REASON_MAX_LENGTH,
                message: localeText.validateMessages.max(
                  REJECT_REASON_MAX_LENGTH
                ),
              },
            ]}
          >
            <Input.TextArea
              readOnly={isReadOnly}
              disabled={isReadOnly}
              placeholder={
                !isReadOnly ? localeText.event.participant.rejectReason : ""
              }
              defaultValue={defaultRejectReason || undefined}
              rows={4}
              maxLength={REJECT_REASON_MAX_LENGTH}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RejectModal;
