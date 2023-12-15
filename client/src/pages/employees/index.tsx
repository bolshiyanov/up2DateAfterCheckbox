import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  let columns = [];

  if (isSuperAdmin) {
    columns = SuperAdminColumns;
  } else if (isProvider) {
    columns = ProviderColumns;
  } else {
    columns = AgentColumns;
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
          display: "block",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          marginBottom: 16,
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
            dataSource={data}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
            onRow={(record) => {
              return {
                onClick: ProviderColumns
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
