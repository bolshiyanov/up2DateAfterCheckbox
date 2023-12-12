import { Descriptions, Space, Divider, Modal, Flex, Spin } from "antd";
import { CustomButton } from "../../components/custom-button";
import { useState } from "react";
import { Paths } from "../../paths";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { formatDateString } from "../../utils/formatDateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPenToSquare,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getRideCategoria,
  getRideStartPoints,
  getRideTypeName,
} from "../../utils/getRideTypes";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

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

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Uncnoun error");
      }
    }
  };

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          aspectRatio: "24 / 9",
          backgroundColor: "rgba(29, 29, 29, 0.8)",
          marginTop: -64,
        }}
      >
        <img
          src={
            data.rideFoto !== null
              ? data.rideFoto
              : "https://source.unsplash.com/weekly?boats"
          }
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(29, 29, 29, 0.8)",
          padding: 16,
        }}
      >
        <Descriptions
          title={`Information about ride ${data.rideName}`}
          bordered
        >
          <Descriptions.Item label="Rider type" span={3}>
            {getRideTypeName(data.rideType)}
          </Descriptions.Item>
          <Descriptions.Item label="Date Registration" span={3}>
            {data.isNewRide === true
              ? `NEW, ${formatDateString(data.dateRegistration)}`
              : formatDateString(data.dateRegistration)}
          </Descriptions.Item>
          <Descriptions.Item label="Blocked?" span={3}>
            {data.isBlocked === false
              ? "Available for rides catalog"
              : "The ride is blocked by the super administrator"}
          </Descriptions.Item>
          <Descriptions.Item label="Booking" span={3}>
            {data.isAvailable === false
              ? "The owner has disabled the availability of this ride for a while"
              : "The ride is available for booking"}
          </Descriptions.Item>
          <Descriptions.Item label="Ride Name" span={3}>
            {data.rideName}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {data.description}
          </Descriptions.Item>
          <Descriptions.Item label="Type Boat" span={3}>
            {getRideCategoria(data.rideType, data.categorias)}
          </Descriptions.Item>
          <Descriptions.Item label="Starting from" span={3}>
            {getRideStartPoints(data.rideType, data.startPoints)}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={3}>
            {data.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Google Map Link" span={3}>
            {data.googleMapLink}
          </Descriptions.Item>
        </Descriptions>
        {user?.id === data.userId ? (
          <>
            <Divider orientation="left">Acton</Divider>
            <Space>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <Link to={`/`}>
                  <CustomButton
                    shape="round"
                    type="default"
                    icon={<FontAwesomeIcon icon={faChevronLeft} />}
                  >
                    Go back
                  </CustomButton>
                </Link>
                <Link to={`${Paths.phone}${data.phone}`}>
                  <CustomButton
                    type="primary"
                    shape="round"
                    icon={<FontAwesomeIcon icon={faPhone} />}
                  >
                    Call
                  </CustomButton>
                </Link>
                <Link to={`/employee/edit/${data.id}`}>
                  <CustomButton
                    shape="round"
                    type="default"
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  >
                    Edit
                  </CustomButton>
                </Link>
                <CustomButton
                  shape="round"
                  danger
                  onClick={showModal}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Remove
                </CustomButton>
              </div>
            </Space>
          </>
        ) : (
          <>
            <Divider orientation="left">Acton</Divider>
            <Space>
              <Link to={`/`}>
                <CustomButton
                  shape="round"
                  type="default"
                  icon={<FontAwesomeIcon icon={faChevronLeft} />}
                >
                  Go back
                </CustomButton>
              </Link>
              <Link to={`${Paths.phone}${data.phone}`}>
                <CustomButton
                  type="primary"
                  shape="round"
                  icon={<FontAwesomeIcon icon={faPhone} />}
                >
                  Call
                </CustomButton>
              </Link>
            </Space>
          </>
        )}
        <ErrorMessage message={error} />
        <Modal
          title="Confirm remove"
          open={isModalOpen}
          onOk={handleDeleteUser}
          onCancel={hideModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          Do you really want to remove the boat?
        </Modal>
      </div>
    </Layout>
  );
};
