// RemoveUserModal.tsx

import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useRemoveUserMutation } from "../../../app/serivices/auth";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { Paths } from "../../../paths";
import { ErrorMessage } from "../../../components/error-message";

interface RemoveUserModalProps {
  isVisible: boolean;
  onCancel: () => void;
  userIdToRemove: string;
}

const RemoveUserModal: React.FC<RemoveUserModalProps> = ({
  isVisible,
  onCancel,
  userIdToRemove,
}) => {
  const [error, setError] = useState("");
  const [removeUser] = useRemoveUserMutation();
  const navigate = useNavigate();

  const hideModal = () => {
    onCancel();
  };

  const handleDeleteUser = async () => {
    hideModal();
  
    try {
      await removeUser(userIdToRemove).unwrap();
      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Modal
      title="Confirm remove"
      visible={isVisible}
      onOk={handleDeleteUser}
      onCancel={hideModal}
      okText="Confirm"
      cancelText="Cancel"
    >
      Do you really want to remove this user?
      <ErrorMessage message={error} />
    </Modal>
  );
};

export default RemoveUserModal;
