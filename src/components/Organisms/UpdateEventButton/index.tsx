import UpdateEvent from "@/components/Molecules/UpdateEvent";
import useTrans from "@/hooks/useTrans";
import { EditOutlined } from "@ant-design/icons";
import { Form, Modal, Tooltip } from "antd";
import React, { useState } from "react";

type UpdateEventButtonProps = {
  id: number;
};

const UpdateEventButton: React.FC<UpdateEventButtonProps> = ({ id }) => {
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
  };

  return (
    <>
      <Tooltip placement="top" title={localeText.event.editInfo}>
        <EditOutlined
          className="text-green-400 text-xl cursor-pointer"
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title={localeText.event.updateEvent}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={localeText.save}
      >
        <UpdateEvent id={id} form={form} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default UpdateEventButton;
