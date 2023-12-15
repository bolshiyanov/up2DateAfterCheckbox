// CustomModal.tsx
import React from "react";
import { Modal, Typography } from "antd";

type CustomModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  todayName: string;
};

const CustomModal: React.FC<CustomModalProps> = ({
  isModalOpen,
  handleOk,
  todayName
}) => {

    const { Title } = Typography;

  return (
    <Modal
      title={`Edit ${todayName} schedle`}
      visible={isModalOpen}
      onOk={handleOk}
    > <Title level={5} style={{ paddingTop: 0 }}>{todayName}</Title>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default CustomModal;
