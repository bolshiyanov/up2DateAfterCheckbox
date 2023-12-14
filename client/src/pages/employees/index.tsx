import React, { useEffect } from "react";
import { Row, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
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
  let widthColumns = 790;
  if (isSuperAdmin) {
    columns = superAdminColumns;
  } else if (isProvider) {
    widthColumns = 790;
    columns = providerColumns;
    widthColumns = 1500;
  } else {
    columns = agentColumns;
    widthColumns = 1400;
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
                onClick: () => navigate(`${Paths.employee}/${record.id}`),
              };
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
