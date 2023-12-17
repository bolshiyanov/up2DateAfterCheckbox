import React, { useEffect } from "react";
import { Employee } from "@prisma/client";
import { Row, Table, Flex, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { SuperAdminColumns } from "../../components/employeesTables/superAdminColumns";
import { ProviderColumns } from "../../components/employeesTables/providerColumns";
import { AgentColumns } from "../../components/employeesTables/agentColumns";
import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import Stories from "../../components/stories";

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const selectedId = useSelector(
    (state: RootState) => state.selectedIds.selectedId
  );
  console.log(' selectedId Employees',selectedId )
  const { data, isLoading } = useGetAllEmployeesQuery();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{ height: "100vh", width: "100%" }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  // For Edit user
  // const editUsers = () => navigate(Paths.usersEdit);

  let columns = [];
  let newData: Employee[] | undefined;
  let availableData: Employee[] | undefined;

  if (isSuperAdmin) {
    columns = SuperAdminColumns;
    newData = data?.slice();  
    newData?.sort((a, b) => {
      const dateA = a.dateRegistration ? new Date(a.dateRegistration) : null;
      const dateB = b.dateRegistration ? new Date(b.dateRegistration) : null;
    
      // Handle the case where dateA or dateB is null
      if (!dateA || !dateB) {
        return 0; // Or choose another default behavior
      }
    
      return  dateB.getTime() - dateA.getTime();
    });
  } else if (isProvider) {
    newData = data?.filter((item) => item.userId === user?.id);
    columns = ProviderColumns;
  } else {
    columns = AgentColumns;
    availableData = data?.filter((item) => item.isAvailable && !item.isBlocked);
    newData =  availableData?.filter((item) => item.categorias === selectedId);
  }

  return (
    <Layout>
      {(!isSuperAdmin && !isProvider) && isAgent && <Stories/>}
      <Row align="middle" justify="start" style={{ margin: 16 }}>
        {(isSuperAdmin || isProvider) && !isAgent && (
          <CustomButton
            onClick={gotToAddUser}
            type="primary"
            icon={<FontAwesomeIcon icon={faCirclePlus} />}
          >
            Add ride
          </CustomButton>
        )}

        {/* For edit users */}
        {/* {isSuperAdmin && !isProvider && !isAgent && (
          <CustomButton
            onClick={editUsers}
            type="primary"
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
          >
            Edit Users
          </CustomButton>
        )} */}

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
