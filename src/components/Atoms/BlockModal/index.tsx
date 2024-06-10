"use client";
import useTrans from "@/hooks/useTrans";
import { BLOCK_REASON_MAX_LENGTH } from "@/utils/constants";
import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

type BlockModalProps = {
  children: React.ReactElement;
  isReadOnly?: boolean;
  defaultBlockReason?: string | null;
  onSubmit?: (blockReason: string) => Promise<void>;
  isRequired?: boolean;
};

type FieldType = {
  blockReason: string;
};

const BlockModal: React.FC<BlockModalProps> = ({
  children,
  isReadOnly = false,
  defaultBlockReason,
  onSubmit = () => {},
  isRequired = false,
}) => {
  const { localeText } = useTrans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: FieldType) => {
    if (!isReadOnly) {
      await onSubmit(values.blockReason);
    }
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
        setIsModalOpen(false);
      })
      .catch((errors) => {
        // Errors in the fields
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setIsModalOpen(true) })}
      <Modal
        title={localeText.block}
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
          name="blockForm"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label={localeText.blockReason}
            name="blockReason"
            rules={[
              {
                required: isRequired,
                message: localeText.validateMessages.required(
                  localeText.blockReason
                ),
              },
              {
                max: BLOCK_REASON_MAX_LENGTH,
                message: localeText.validateMessages.max(
                  BLOCK_REASON_MAX_LENGTH
                ),
              },
            ]}
          >
            <Input.TextArea
              readOnly={isReadOnly}
              disabled={isReadOnly}
              placeholder={localeText.blockReason}
              defaultValue={defaultBlockReason || undefined}
              rows={4}
              maxLength={BLOCK_REASON_MAX_LENGTH}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BlockModal;
