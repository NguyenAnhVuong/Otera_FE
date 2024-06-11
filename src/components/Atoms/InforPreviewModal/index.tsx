import React, { useState } from "react";
import ShowDetailButton from "@/components/Atoms/ShowDetailButton";
import { Modal } from "antd";
type InforPreviewModalProps = {
  children?: React.ReactNode;
};

const InforPreviewModal: React.FC<InforPreviewModalProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ShowDetailButton onClick={showModal} />
      <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default InforPreviewModal;
