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
import { superAdminColumns } from "../../components/employeesTables/superAdminColumns";
import { providerColumns } from "../../components/employeesTables/providerColumns";
import { agentColumns } from "../../components/employeesTables/agentColumns";

const isSuperAdmin = true;
const isProvider = false;
const isAgent = false;

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

  let columns = [];
  if (isSuperAdmin) {
    columns = superAdminColumns;
  } else if (isProvider) {
    columns = providerColumns;
  } else {
    columns = agentColumns;
  }

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
      
        <div
          style={{
            display: 'block',
            width: "100%",
            minWidth: 760,
          }}
        >
          <Table
            style={{ marginRight: 16, marginLeft: 16 }}
            loading={isLoading}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
            onRow={(record) => {
              return {
                onClick: () => navigate(`${Paths.employee}/${record.id}`),
              };
            }}
          />
        </div>
    </Layout>
  );
};
