import ShowDetailButton from "@/components/Atoms/ShowDetailButton";
import TempleDetail from "@/components/Templates/TempleDetail";
import useTrans from "@/hooks/useTrans";
import { Modal } from "antd";
import React, { useState } from "react";

type PreviewTempleDetailProps = {
  templeId: number;
};

const PreviewTempleDetail: React.FC<PreviewTempleDetailProps> = ({
  templeId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <ShowDetailButton onClick={showModal} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <TempleDetail templeId={templeId} />
      </Modal>
    </>
  );
};

export default PreviewTempleDetail;
