import React, { useEffect } from "react";
import { Row, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { formatDateString } from "../../utils/formatDateString";
import { boatsTypes, portsTypes } from "../../dummyData";

const getTypeBoatName = (typeBoatKey: string) => {
  const foundType = boatsTypes.find((type) => type.key === typeBoatKey);
  return foundType ? foundType.name : "Unknown Type";
};

const getTypePortName = (typeBoatKey: string) => {
  const foundType = portsTypes.find((type) => type.key === typeBoatKey);
  return foundType ? foundType.name : "Unknown Type";
};

const columns: ColumnsType<Employee> = [
  {
    title: "Date",
    render: (text, record) =>
      record.isNewBoat === true
        ?  <Tag color="green">New</Tag>
        : formatDateString(record.dateRegistration),
    key: "newBoat",
  },
  {
    title: "Boats Name",
    dataIndex: "boatsName",
    key: "boatsName",
  },
  {
    title: "Type",
    render: (_, record) => getTypeBoatName(record.typeBoat),
    key: "typeBoat",
  },
  {
    title: "Ports",
    render: (_, record) => getTypePortName(record.typePort),
    key: "typePort",
  },

  {
    title: "Booking",
    render: (text, record) =>
      record.isAvailable === true ?  "Available" : <Tag color="orange">Blocked</Tag> ,
  },
  {
    title: "Blocked",
    render: (text, record) =>
      record.isBlocked === false ?  "Available" : <Tag color="volcano">Blocked</Tag> ,
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
      <Row
        align="middle"
        justify="start"
        style={{ margin: 16 }}
      >
        <CustomButton
          type="primary"
          onClick={gotToAddUser}
          icon={<PlusCircleOutlined />}
        >
          Add boats
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
