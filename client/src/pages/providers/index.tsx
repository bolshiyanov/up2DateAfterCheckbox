import React, { useEffect } from "react";
import { Row, Table } from "antd";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { UsersColumns } from "../../components/employeesTables/usersColumns";

import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import { useGetAllUsersQuery } from "../../app/serivices/auth";
import { User } from "@prisma/client";

export const EditProviders = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.home);
  
  let newData: User[] | undefined;
  newData = data?.filter((item) => item.owner === true);

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
            dataSource={newData}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
            //  onRow={(record) => {
            // return {
            //   onClick: isProvider
            //     ? () => {}
            //     : () => navigate(`${Paths.employee}/${record.id}`),
            // };
            // }}
          />
        </div>
      </div>
    </Layout>
  );
};
