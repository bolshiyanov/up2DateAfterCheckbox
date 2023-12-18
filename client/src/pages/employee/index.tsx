import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  Descriptions,
  Space,
  Divider,
  Modal,
  Flex,
  Spin,
  Typography,
  FloatButton,
} from "antd";
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
import { selectUser } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faComment,
  faPenToSquare,
  faPhone,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getRideCategoria,
  getRideStartPoints,
  getRideTypeName,
} from "../../utils/getRideTypes";
import { isAgent, isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import ShowFavoritComments from "../../components/favorit-components/showFavoritComments";
import { addOrRemoveRides } from "../../features/favoritSlice/favoritSlice";

export const Employee = () => {
  const dispatch: AppDispatch = useDispatch();
  const favoriteArray = useSelector(
    (state: RootState) => state.favoritedRides.favoritedRides
  );
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);
  const { Title } = Typography;
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

  const setToFavoriteList = (id: string) => {
    dispatch(addOrRemoveRides(id));
  };

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          paddingBottom: 64,
          padding: 16,
        }}
      >
        <div style={{ width: "100%", maxWidth: 800 }}>
          <Title level={2} style={{ paddingTop: 12 }}>
            {`Information about ride ${data.rideName}`}
          </Title>
          <Descriptions
            bordered
            style={{
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              borderRadius: 6,
            }}
          >
            <Descriptions.Item label="Favorit information"  >
              <ShowFavoritComments />
            </Descriptions.Item>
            <Descriptions.Item label="Rider type"  >
              {getRideTypeName(data.rideType || "")}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Date Registration"  >
              {data.isNewRide === true
                ? `NEW, ${formatDateString(data.dateRegistration || "")}`
                : formatDateString(data.dateRegistration || "")}
            </Descriptions.Item>
            <Descriptions.Item label="Blocked?"  >
              {data.isBlocked === false
                ? "Available for rides catalog"
                : "The ride is blocked by the super administrator"}
            </Descriptions.Item>
            <Descriptions.Item label="Booking"  >
              {data.isAvailable === false
                ? "The owner has disabled the availability of this ride for a while"
                : "The ride is available for booking"}
            </Descriptions.Item> */}
            <Descriptions.Item label="Ride Name"  >
              {data.rideName}
            </Descriptions.Item>
            <Descriptions.Item label="Description"  >
              {data.description}
            </Descriptions.Item>
            <Descriptions.Item label="Type Boat"  >
              {getRideCategoria(data.rideType || "", data.categorias || "")}
            </Descriptions.Item>
            <Descriptions.Item label="Starting from"  >
              {getRideStartPoints(data.rideType || "", data.startPoints || "")}
            </Descriptions.Item>
            <Descriptions.Item label="Phone"  >
              {data.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Google Map Link"  >
              {data.googleMapLink}
            </Descriptions.Item>
          </Descriptions>
          {user?.id === data.userId || isSuperAdmin ? (
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
                  {isAgent && (
                    <>
                      <CustomButton
                        shape="round"
                        onClick={showModal}
                        icon={<FontAwesomeIcon icon={faComment} />}
                      >
                        Comment
                      </CustomButton>
                      <CustomButton
                        shape="round"
                        onClick={() => setToFavoriteList(data.id)}
                        icon={
                          <FontAwesomeIcon
                            color={
                              favoriteArray.includes(data.id)
                                ? "yellow"
                                : "white"
                            }
                            icon={faStar}
                          />
                        }
                      >
                        Favorite
                      </CustomButton>
                      {/* <Link to={`${Paths.phone}${data.phone}`}>
                        <CustomButton
                          type="primary"
                          shape="round"
                          icon={<FontAwesomeIcon icon={faPhone} />}
                        >
                          Call
                        </CustomButton>
                      </Link> */}
                      <Link to={`${Paths.phone}${data.phone}`}>
                        <FloatButton
                          icon={<FontAwesomeIcon icon={faPhone} />}
                          type="primary"
                          style={{ right: 10, bottom: 120 }}
                        />
                      </Link>
                    </>
                  )}

                  {(isSuperAdmin || isProvider) && (
                    <>
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
                    </>
                  )}
                </div>
              </Space>
            </>
          ) : (
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
                  {isAgent && (
                    <Link to={`${Paths.phone}${data.phone}`}>
                      <CustomButton
                        type="primary"
                        shape="round"
                        icon={<FontAwesomeIcon icon={faPhone} />}
                      >
                        Call
                      </CustomButton>
                    </Link>
                  )}
                </div>
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
      </div>
    </Layout>
  );
};
