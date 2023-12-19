import React, { useEffect } from "react";
import { Employee } from "@prisma/client";
import { Row, Table, Flex, Spin, Typography } from "antd";
import type { ColumnsType} from "antd/es/table";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { SuperAdminColumns } from "../../components/employeesTables/superAdminColumns";
import { ProviderColumns } from "../../components/employeesTables/providerColumns";

import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import Stories from "../../components/stories";
import GlobalCategoriasSlider from "../../components/globalCategoriasSlider";
import { setFavoritedRides } from "../../features/favoritSlice/favoritSlice";
import { Schedle } from "../../components/employeesTables/schedle";
import { getDayName, getNextDayName } from "../../utils/getDayName";

import { Tag } from "antd";

const today = new Date();
const todayName = getDayName(today);
const nextTodayName = getNextDayName(today, 1);
const nextTwoTodayName = getNextDayName(today, 2);
const nextThteeTodayName = getNextDayName(today, 3);
const nextFourTodayName = getNextDayName(today, 4);
const nextFiveTodayName = getNextDayName(today, 5);
const nextSixTodayName = getNextDayName(today, 6);

export const Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const selectedIds = useSelector(
    (state: RootState) => state.selectedIds.selectedIds
  );
  const favoriteArray = useSelector(
    (state: RootState) => state.favoritedRides.favoritedRides
  );

  const { data, isLoading } = useGetAllEmployeesQuery();
  const { Title } = Typography;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isAgent) {
      dispatch(setFavoritedRides());
    }
  }, [dispatch]);

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
  const editUsers = () => navigate(Paths.usersEdit);
  const editProviders = () => navigate(Paths.providersEdit);

  let columns = [];
  let newData: Employee[] | undefined;
  let availableData: Employee[] | undefined;
  let modifiedData: Employee[] | undefined;
  if (isSuperAdmin) {
    columns = SuperAdminColumns;
    newData = data?.slice();
    newData?.sort((a, b) => {
      const dateA = a.dateRegistration ? new Date(a.dateRegistration) : null;
      const dateB = b.dateRegistration ? new Date(b.dateRegistration) : null;

      if (!dateA || !dateB) {
        return 0;
      }

      return dateB.getTime() - dateA.getTime();
    });
  } else if (isProvider) {
    newData = data?.filter((item) => item.userId === user?.id);
    columns = ProviderColumns;
  } else {
    const AgentColumns: ColumnsType<Employee> = [
      {
        title: "Ride Name",
        fixed: "left",
        width: 110,
        render: (text, record) =>
          favoriteArray.indexOf(record.id) !== -1 ? (
            <>
              <Tag color="yellow">Favorite</Tag>
              <br />
              {record.rideName}
            </>
          ) : (
            record.rideName
          ),
        key: "rideName",
        dataIndex: "rideName",
        sorter: {
          compare: (a, b) => {
            const rideNameA = a.rideName || "";
            const rideNameB = b.rideName || "";

            return rideNameA.localeCompare(rideNameB);
          },
          multiple: 2,
        },
      },
      {
        title: "Starting from",
        width: 110,
        dataIndex: "startPoints",
        key: "startPoints",
        sorter: {
          compare: (a, b) => {
            const startPointsA = a.startPoints || "";
            const startPointsB = b.startPoints || "";

            return startPointsA.localeCompare(startPointsB);
          },
          multiple: 1,
        },
      },
      {
        title: "Photo",
        render: (record) => (
          <div
            style={{
              width: 90,
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
                borderRadius: 6,
              }}
            />
          </div>
        ),
        key: "rideFoto",
        width: 120,
      },

      {
        title: todayName,
        render: (_, record) => <Schedle todayName={todayName} item={record} />,
        key: todayName,
        width: 150,
      },

      {
        title: nextTodayName,
        render: (_, record) => (
          <Schedle todayName={nextTodayName} item={record} />
        ),
        key: nextTodayName,
        width: 150,
      },
      {
        title: nextTwoTodayName,
        render: (_, record) => (
          <Schedle todayName={nextTwoTodayName} item={record} />
        ),
        key: nextTwoTodayName,
        width: 150,
      },
      {
        title: nextThteeTodayName,
        render: (_, record) => (
          <Schedle todayName={nextThteeTodayName} item={record} />
        ),
        key: nextThteeTodayName,
        width: 150,
      },
      {
        title: nextFourTodayName,
        render: (_, record) => (
          <Schedle todayName={nextFourTodayName} item={record} />
        ),
        key: nextFourTodayName,
        width: 150,
      },
      {
        title: nextFiveTodayName,
        render: (_, record) => (
          <Schedle todayName={nextFiveTodayName} item={record} />
        ),
        key: nextFiveTodayName,
        width: 150,
      },
      {
        title: nextSixTodayName,
        render: (_, record) => (
          <Schedle todayName={nextSixTodayName} item={record} />
        ),
        key: nextSixTodayName,
        width: 150,
      },
    ];

    columns = AgentColumns;

    modifiedData = data?.filter((item) => item.isAvailable && !item.isBlocked);
    
    availableData = modifiedData?.filter((item) =>
      
    selectedIds.includes(item.categorias || ""));
      
    newData = availableData?.map(item => {
      if (favoriteArray.includes(item.id)) {
        return {
          ...item,
          rideName: " " + item.rideName
        };
      }
      return item;
    });
    

  }

  return (
    <Layout>
      {!isSuperAdmin && !isProvider && isAgent && <GlobalCategoriasSlider />}
      {!isSuperAdmin && !isProvider && isAgent && <Stories />}
      <Title level={3} style={{ paddingTop: 12, marginLeft: 16 }}>
        {`Selected ${newData?.length} rides for book`}
      </Title>
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
        {isSuperAdmin && !isProvider && !isAgent && (
          <CustomButton
            onClick={editUsers}
            type="primary"
            icon={<FontAwesomeIcon icon={faUser} />}
          >
            Users
          </CustomButton>
        )}

        {/* For edit users */}
        {isSuperAdmin && !isProvider && !isAgent && (
          <CustomButton
            onClick={editProviders}
            type="primary"
            icon={<FontAwesomeIcon icon={faUserTie} />}
          >
            Providers
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

// Exporting the favorited rides array selector
export const favoriteArray = (state: RootState) =>
  state.favoritedRides.favoritedRides;
