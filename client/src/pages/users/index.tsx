// EditUsers.js

import React, { useEffect, useState } from "react";
import { Modal, Row, Table } from "antd";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { faChevronLeft, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { formatDateString } from "../../utils/formatDateString";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import RemoveUserModal from "../../components/custom-modal/remove-users-modal";
import { useGetAllUsersQuery } from "../../app/serivices/auth";
import { User } from "@prisma/client";
import { stringify } from "querystring";
import generateRandomPassword from "../../utils/genereteRandomPassword";

const EditUsers = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllUsersQuery();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.home);

  
  const warningModal = ({ id, email }: { id: string; email: string }) => {
    const newPassword = generateRandomPassword();
    Modal.warning({
      title: `This is new nassword for ${email}`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      content: `${newPassword}`,
      
    });
  };



  

  const UsersColumns: ColumnsType<User> = [
    {
      title: "Date",
      render: (text, record) => formatDateString(record.dateRegistration || ""),
      key: "dateRegistration",
      width: 150,
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
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      
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
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      
      width: 160,
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
      title: "Change password",
      render: (text, record) => (
        <CustomButton
          shape="round"
          type="primary"
          onClick={() => warningModal({ id: record.id, email: record.email })}
          icon={<FontAwesomeIcon icon={faUnlockKeyhole} />}
        >
          Change
        </CustomButton>
      ),
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
      width: 140,
    },
  ];

  

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setUserIdToRemove(id);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Row align="middle" justify="start" style={{ margin: 16 }}>
        {/* ... (остальной код) */}
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
      <RemoveUserModal
        isVisible={isModalOpen}
        onCancel={hideModal}
        userIdToRemove={userIdToRemove}
      />
    </Layout>
  );
};

export default EditUsers;