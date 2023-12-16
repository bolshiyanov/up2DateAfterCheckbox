import React, { useEffect } from "react";
import { Employee } from "@prisma/client";
import { Row, Table } from "antd";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SuperAdminColumns } from "../../components/employeesTables/superAdminColumns";
import { ProviderColumns } from "../../components/employeesTables/providerColumns";
import { AgentColumns } from "../../components/employeesTables/agentColumns";
import { isProvider, isSuperAdmin } from "../../utils/typeOfUser";

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();
  const isMobile = window.innerWidth < 768;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  let columns = [];
  let newData: Employee[] | undefined;

  if (isSuperAdmin) {
    columns = SuperAdminColumns;
    newData = data;
  } else if (isProvider) {
    newData = data?.filter((item) => item.userId === user?.id);
    columns = ProviderColumns;
  } else {
    columns = AgentColumns;
    newData = data?.filter((item) => item.isAvailable && !item.isBlocked);
  }
  console.log('newData Employees', newData)

  return (
    <Layout>
      <Row align="middle" justify="start" style={{ margin: 16 }}>
        <CustomButton
          onClick={gotToAddUser}
          type="primary"
          icon={<FontAwesomeIcon icon={faCirclePlus} />}
        >
          Add ride
        </CustomButton>
        {/* Add your other CustomButtons here */}
      </Row>

      <div
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          width: "100%",
          marginBottom: 16,
          maxHeight: isMobile ? "100vh" : "85vh",
          paddingBottom: 64
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
            columns={columns}
            dataSource={newData}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
            onRow={(record) => {
              return {
                onClick: isProvider
                  ? () => {}
                  : () => navigate(`${Paths.employee}/${record.id}`),
              };
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
