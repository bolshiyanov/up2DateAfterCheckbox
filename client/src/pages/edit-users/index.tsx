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

import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import { useGetAllUsersQuery } from "../../app/serivices/auth";

export const EditUsers = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetAllUsersQuery();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  console.log('user EditUser', user )
  console.log('users data EditUser', data )

  const gotToAddUser = () => navigate(Paths.employeeAdd);
  

  

  return (
    <Layout>
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

        

        {/* Add your other CustomButtons here */}
      </Row>

    </Layout>
  );
};
