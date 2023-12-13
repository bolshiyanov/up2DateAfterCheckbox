import React, { useEffect } from "react";
import { Image, Row, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { formatDateString } from "../../utils/formatDateString";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  getRideCategoria,
  getRideStartPoints,
  getRideTypeName,
} from "../../utils/getRideTypes";

const columns: ColumnsType<Employee> = [
  {
    title: "Date",
    render: (text, record) =>
      record.isNewRide === true ? (
        <Tag color="green">New</Tag>
      ) : (
        formatDateString(record.dateRegistration)
      ),
    key: "newBoat",
    width: 120,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Ride Name",
    dataIndex: "rideName",
    key: "rideName",
    ellipsis: {
      showTitle: false,
    },
    width: 100,
  },
  {
    title: "Photo",
    render: (record) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(29, 29, 29, 0.8)",
        }}
      >
        <img
          src={record.rideFoto}
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    ),
    key: "rideFoto",
    width: 100,
  },

  {
    title: "Ride Type",
    render: (_, record) => getRideTypeName(record.rideType),
    key: "rideType ",
  },

  {
    title: "Categoria",
    render: (_, record) => getRideCategoria(record.rideType, record.categorias),
    key: "categorias",
  },
  {
    title: "Starting from",
    render: (_, record) =>
      getRideStartPoints(record.rideType, record.startPoints),
    key: "startPoints",
  },

  {
    title: "Booking",
    render: (text, record) =>
      record.isAvailable === true ? (
        "Available"
      ) : (
        <Tag color="orange">Blocked</Tag>
      ),
  },
  {
    title: "Blocked",
    render: (text, record) =>
      record.isBlocked === false ? (
        "Available"
      ) : (
        <Tag color="volcano">Blocked</Tag>
      ),
  },
];

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <Row align="middle" justify="start" style={{ margin: 16 }}>
        <CustomButton
          type="primary"
          onClick={gotToAddUser}
          icon={<FontAwesomeIcon icon={faCirclePlus} />}
        >
          Add ride
        </CustomButton>
        {/* <CustomButton
          type="primary"
          onClick={gotToAddUser}
          icon={<PlusCircleOutlined />}
        >
          Add types
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={gotToAddUser}
          icon={<PlusCircleOutlined />}
        >
          Add ports
        </CustomButton> */}
      </Row>
      <Table
        style={{ marginRight: 16, marginLeft: 16 }}
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
