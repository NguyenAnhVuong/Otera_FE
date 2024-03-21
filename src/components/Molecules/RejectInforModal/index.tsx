import useTrans from "@/hooks/useTrans";
import { Button, Modal } from "antd";
import React, { useState } from "react";

type InformationModalProps = {
  infor: string;
};

const RejectInforModal: React.FC<InformationModalProps> = ({ infor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { localeText } = useTrans();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span className="underline cursor-pointer" onClick={showModal}>
        {localeText.deathAnniversary.reject}
      </span>
      <Modal
        title={localeText.deathAnniversary.rejectInforModal.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{infor}</p>
      </Modal>
    </>
  );
};

export default RejectInforModal;
