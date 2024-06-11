import useTrans from "@/hooks/useTrans";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

type InviteMemberModalProps = {
  title?: string;
  okText?: string;
  handleInviteMember: (email: string) => Promise<void>;
};

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  title,
  okText,
  handleInviteMember,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { localeText } = useTrans();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string }) => {
    try {
      await form.validateFields();
      await handleInviteMember(values.email);
      setIsModalOpen(false);
    } catch (error) {
      return;
    }
  };

  const handleOK = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        {localeText.family.familyMember.add}
      </Button>
      <Modal
        title={title ?? localeText.family.familyMember.addMessage}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        cancelText={localeText.cancel}
        okText={okText ?? localeText.send}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(localeText.email),
              },
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
            ]}
          >
            <Input placeholder={localeText.family.familyMember.email} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InviteMemberModal;
