import React, { useEffect, useState } from "react";
import { Modal, Row, Table } from "antd";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDateString } from "../../utils/formatDateString";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
} from "../../app/serivices/auth";
import { User } from "@prisma/client";
import { ErrorMessage } from "../../components/error-message";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const EditUsers = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");
  const [removeUser] = useRemoveUserMutation();
  const { data, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.home);

  const UsersColumns: ColumnsType<User> = [
    {
      title: "Date",
      render: (text, record) => formatDateString(record.dateRegistration || ""),
      key: "dateRegistration",
      width: 120,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Is Provider?",
      render: (text, record) =>
        record.owner === false ? (
          <Tag color="green">User</Tag>
        ) : (
          <Tag color="blue">Provider</Tag>
        ),
      key: "isAvailable",
      width: 140,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: {
        showTitle: false,
      },
      width: 140,
    },
    {
      title: "Blocked",
      render: (text, record) =>
        record.isBlocked === false ? (
          <Tag color="green">Can be use</Tag>
        ) : (
          <Tag color="volcano">Blocked</Tag>
        ),
      key: "isAvailable",
      width: 140,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      width: 140,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: {
        showTitle: false,
      },
      width: 140,
    },
    {
      title: "Remove",
      render: (text, record) => (
        <CustomButton
          shape="round"
          danger
          onClick={() => showModal(record.id)}
          icon={<FontAwesomeIcon icon={faTrash} />}
        >
          Remove
        </CustomButton>
      ),
      key: "isAvailable",
      width: 140,
    },
  ];

  

  const showModal = (id: string) => {
    setIsModalOpen(true);
    // Save the id in state or a variable
    setUserIdToRemove(id);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      // Use the captured id from state or variable
      await removeUser(userIdToRemove).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Uncnoun error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="start" style={{ margin: 16 }}>
        {(isSuperAdmin || isProvider) && !isAgent && (
          <CustomButton
            onClick={gotToAddUser}
            type="primary"
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
          >
            Go back
          </CustomButton>
        )}

        {/* Add your other CustomButtons here */}
      </Row>
      <div
        style={{
          display: "block",
          overflowX: "scroll",
          width: "100%",
          marginBottom: 16,
          paddingBottom: 64,
        }}
      >
        <div
          style={{
            display: "inline-block",
            marginRight: 8,
            whiteSpace: "normal",
            marginBottom: 50,
          }}
        >
          <Table
            style={{ marginRight: 16, marginLeft: 16 }}
            loading={isLoading}
            rowKey={(record) => record.id}
            columns={UsersColumns}
            dataSource={data}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
          />
        </div>
      </div>
      <ErrorMessage message={error} />
      <Modal
        title="Confirm remove"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you really want to remove this user?
      </Modal>
    </Layout>
  );
};
