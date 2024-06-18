import EventOrganize from "@/components/Molecules/EventOrganize";
import useTrans from "@/hooks/useTrans";
import { Button, Form, Modal } from "antd";
import React, { useState } from "react";

type Props = {};

const EventOrganizeButton = (props: Props) => {
  const { localeText } = useTrans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      return;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {localeText.event.organizeEvent}
      </Button>
      <Modal
        title={localeText.event.organizeEvent}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={localeText.organize}
      >
        <EventOrganize form={form} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default EventOrganizeButton;
