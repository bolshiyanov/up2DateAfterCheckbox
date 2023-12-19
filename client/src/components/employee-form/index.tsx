import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Employee } from "@prisma/client";
import {
  Form,
  Card,
  Space,
  Flex,
  Switch,
  Typography,
  Divider,
  Checkbox,
  Modal,
} from "antd";
import { CustomButton } from "../custom-button";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomTypeSelectCategoria } from "../custom-type-select/customTypeSelectCategoria";
import { CustomTypeSelectStartPoints } from "../custom-type-select/customTypeSelectStartPoints";
import { CustomCheck } from "../custom-check";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCloudArrowDown,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CustomTypeSelectRide } from "../custom-type-select/customTypeSelectRide";
import { CustomSelectMorningPicker } from "../custom-type-select/customSelectMorningPicker";
import { CustomSelectAfternoonPicker } from "../custom-type-select/customSelectAfternoonPicker";
import { CustomSelectEveningPicker } from "../custom-type-select/customSelectEveningPicker";
import { CustomSelectExtraPicker } from "../custom-type-select/customSelectExtraPicker";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { isProvider, isSuperAdmin } from "../../utils/typeOfUser";
import Widget from "../custom-image-upload/Widget";
import { getRideTypeName } from "../../utils/getRideTypes";
import { useRemoveEmployeeMutation } from "../../app/serivices/employees";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  btnTextCancel: string;
  btnTextGoBack: string;
  isAvailable: boolean;
  isNewRide: boolean;
  isBlocked: boolean;
  pageName: string;
  rideType: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  employee,
  btnText,
  btnTextCancel,
  btnTextGoBack,
  pageName,
  isAvailable,
  isNewRide,
  isBlocked,
  rideType,
  error,
}: Props<Employee>) => {
  const navigate = useNavigate();
  const [schedleSettings, setSchedleSettings] = useState(true);
  const [eror, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedMonday, setCheckedMonday] = useState(false);
  const [checkedTuesday, setCheckedTuesday] = useState(false);
  const [checkedWednesday, setCheckedWednesday] = useState(false);
  const [checkedThursday, setCheckedThursday] = useState(false);
  const [checkedFriday, setCheckedFriday] = useState(false);
  const [checkedSaturday, setCheckedSaturday] = useState(false);
  const [checkedSunday, setCheckedSunday] = useState(false);
  const [removeEmployee] = useRemoveEmployeeMutation();
  
  const { Title } = Typography;

  const onChangeMonday = (e: CheckboxChangeEvent) => {
    setCheckedMonday(e.target.checked);
  };
  const onChangeTuesday = (e: CheckboxChangeEvent) => {
    setCheckedTuesday(e.target.checked);
  };
  const onChangeWednesday = (e: CheckboxChangeEvent) => {
    setCheckedWednesday(e.target.checked);
  };
  const onChangeThursday = (e: CheckboxChangeEvent) => {
    setCheckedThursday(e.target.checked);
  };
  const onChangeFriday = (e: CheckboxChangeEvent) => {
    setCheckedFriday(e.target.checked);
  };
  const onChangeSaturday = (e: CheckboxChangeEvent) => {
    setCheckedSaturday(e.target.checked);
  };
  const onChangeSunday = (e: CheckboxChangeEvent) => {
    setCheckedSunday(e.target.checked);
  };

  const toggleSchedleSettings = () => {
    setSchedleSettings(!schedleSettings);
    if (!schedleSettings) {
      setCheckedMonday(false);
      setCheckedTuesday(false);
      setCheckedWednesday(false);
      setCheckedThursday(false);
      setCheckedFriday(false);
      setCheckedSaturday(false);
      setCheckedSunday(false);
    }
  };

  const handleFinish = (values: Employee) => {
    if (imageUrl) {
      values.rideFoto = imageUrl;
    }

    onFinish(values);
  };

  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleUrlChange = (newUrl: string | undefined) => {
    setImageUrl(newUrl);
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
      await removeEmployee(employee?.id ?? "").unwrap();

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
    <Card title={title} style={{ width: "30rem" }}>
      <Form
        name="add-employee"
        autoComplete="off"
        onFinish={handleFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        initialValues={employee}
      >
        {pageName !== "Edit-emploee" && (
          <>
            <CustomTypeSelectRide
              name="rideType"
              selectName="Select the type of ride"
            />
          </>
        )}

        {isSuperAdmin && (
          <>
            <CustomCheck
              name="isNewRide"
              pageName={pageName}
              text={"Ride is new"}
            />
            <CustomCheck
              name="isBlocked"
              pageName={pageName}
              text={"Ride is blocked"}
            />
          </>
        )}

        {isProvider && (
          <CustomCheck
            name="isAvailable"
            pageName={pageName}
            text={"Available for reservation"}
          />
        )}

        <CustomInput type="text" name="rideName" placeholder="Ride name" />
        <CustomInput type="text" name="description" placeholder="Description" />

        {/* <CustomImageUpload /> */}

        {pageName !== "Add-emploee" && <Widget onUrlChange={handleUrlChange} />}

        {pageName !== "Add-emploee" && (
          <>
            <Title level={3} style={{ paddingBottom: 16 }}>
              {getRideTypeName(rideType)}
            </Title>
            <CustomTypeSelectCategoria
              name="categorias"
              selectName="Select the categorias of rides"
              rideType={rideType}
            />
            <CustomTypeSelectStartPoints
              name="startPoints"
              selectName="Select start point"
              rideType={rideType}
            />

            <CustomInput
              addonBefore="https://"
              type="googleMapLink"
              name="googleMapLink"
              placeholder="Google Map Link "
            />
          </>
        )}
        <CustomInput type="text" name="phone" placeholder="Phone" />

        {/* Schedle settings - Monday*/}

        {pageName !== "Add-emploee" && (
          <>
            <Space
              align="center"
              style={{ marginBottom: schedleSettings ? -16 : 32 }}
            >
              <Switch
                checked={schedleSettings}
                onChange={toggleSchedleSettings}
              />{" "}
              <Title level={3} style={{ paddingTop: 12 }}>
                Open schedle settings
              </Title>
            </Space>
            <div>
              {/* Schedle settings - Monday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeMonday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Monday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedMonday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningMonday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonMonday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningMonday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraMonday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Tuesday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeTuesday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Tuesday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedTuesday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningTuesday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonTuesday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningTuesday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraTuesday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Wednesday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeWednesday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Wednesday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedWednesday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningWednesday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonWednesday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningWednesday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraWednesday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Thursday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeThursday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Thursday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedThursday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningThursday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonThursday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningThursday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraThursday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Friday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeFriday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Friday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedFriday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningFriday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonFriday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningFriday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraFriday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Saturday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeSaturday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Saturday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedSaturday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningSaturday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonSaturday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningSaturday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraSaturday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Schedle settings - Sunday*/}
              {schedleSettings && (
                <div style={{ marginBottom: schedleSettings ? 16 : 32 }}>
                  <Divider orientation="left" plain>
                    <Checkbox onChange={onChangeSunday}>
                      <Title level={4} style={{ paddingTop: 8 }}>
                        Sunday
                      </Title>
                    </Checkbox>
                  </Divider>
                  {checkedSunday && (
                    <div>
                      <CustomSelectMorningPicker
                        name="morningSunday"
                        selectName="Choose a morning schedule"
                      />
                      <CustomSelectAfternoonPicker
                        name="afternoonSunday"
                        selectName="Choose a afternoon schedule"
                      />
                      <CustomSelectEveningPicker
                        name="eveningSunday"
                        selectName="Choose a evening schedule"
                      />
                      <CustomSelectExtraPicker
                        name="extraSunday"
                        selectName="Choose a extra schedule"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <Space direction="vertical" size="large">
          <ErrorMessage message={error} />
          <Flex align="middle" justify="center">
            {btnTextGoBack !== "" && (
              <CustomButton
                shape="round"
                htmlType="button"
                icon={<FontAwesomeIcon icon={faChevronLeft} />}
              >
                <Link to="/">{btnTextGoBack}</Link>
              </CustomButton>
            )}
            {btnTextCancel !== "" && pageName !== "Edit-emploee" && (
              <CustomButton
                shape="round"
                htmlType="reset"
                icon={<FontAwesomeIcon icon={faRotate} />}
              >
                {btnTextCancel}
              </CustomButton>
            )}

            <CustomButton
            shape="round"
            danger
            onClick={showModal}
              icon={<FontAwesomeIcon icon={faTrash} />}
            >
              Remove
            </CustomButton>

            <CustomButton
              shape="round"
              type="primary"
              htmlType="submit"
              icon={<FontAwesomeIcon icon={faCloudArrowDown} />}
            >
              {btnText}
            </CustomButton>
          </Flex>
        </Space>
      </Form>
      <ErrorMessage message={eror} />
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
    </Card>
  );
};
