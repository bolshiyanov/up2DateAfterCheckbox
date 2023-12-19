// SchedleModal.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Flex, Form, Modal, Spin, Switch, Typography } from "antd";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../../app/serivices/employees";

import { getRideStartPoints } from "../../../utils/getRideTypes";
import { Employee } from "@prisma/client";
import { Paths } from "../../../paths";
import { isErrorWithMessage } from "../../../utils/is-error-with-message";
import { CustomButton } from "../../custom-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

type CustomModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  onCancel: () => void;
  todayName: string;
  rideName: string | null;
  morningValue: string;
  morningAvailableValue: boolean;
  afternoonValue: string;
  afternoonAvailableValue: boolean;
  eveningValue: string;
  eveningAvailableValue: boolean;
  extraValue: string;
  extraAvailableValue: boolean;
  rideFoto: string;
  startPoints: string;
  rideType: string;
  id: string;
};

const CustomModal: React.FC<CustomModalProps> = ({
  isModalOpen,
  handleOk,
  onCancel,
  todayName,
  rideName,
  morningValue,
  morningAvailableValue,
  afternoonValue,
  afternoonAvailableValue,
  eveningValue,
  eveningAvailableValue,
  extraValue,
  extraAvailableValue,
  rideFoto,
  startPoints,
  rideType,
  id,
}) => {
  const navigate = useNavigate();
  const [editEmployee] = useEditEmployeeMutation();
  const { data, isLoading } = useGetEmployeeQuery(id || "");
  const [error, setError] = useState("");

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

  const handleEditUser = async (values: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...values,
      };

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  const { Title } = Typography;

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      okText="Go Back"
      onCancel={onCancel}
      cancelText="Open full settings"
    >
      <>
        <Flex style={{ width: "100%" }} justify="flex-start" align="flex-start">
          <div
            style={{
              width: 80,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              marginRight: 16,
            }}
          >
            <img
              src={rideFoto}
              alt="Description"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                display: "block",
              }}
            />
          </div>

          <div>
            <Title level={2} style={{ marginBottom: -16 }}>
              Edit {todayName} schedle
            </Title>
            <Title level={4} style={{ paddingBottom: 0 }}>
              {rideName} from {getRideStartPoints(rideType, startPoints)}
            </Title>
          </div>
        </Flex>
        <Divider />

        <Form
          name="edit-schedle"
          autoComplete="off"
          onFinish={handleEditUser}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          initialValues={data}
        >
          {/* morning */}
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="flex-start"
          >
            <p style={{ fontSize: 18, padding: 4 }}>{morningValue}</p>
            <div style={{ paddingTop: 4 }}>
              <Form.Item
                name={`isAvailable${todayName}Morning`}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Flex>

          <Divider />

          {/* afternoon */}
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="flex-start"
          >
            <p style={{ fontSize: 18, padding: 4 }}>{afternoonValue}</p>
            <div style={{ paddingTop: 4 }}>
              <Form.Item
                name={`isAvailable${todayName}Afternoon`}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Flex>
          <Divider />

          {/* evening */}
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="flex-start"
          >
            <p style={{ fontSize: 18, padding: 4 }}>{eveningValue}</p>
            <div style={{ paddingTop: 4 }}>
              <Form.Item
                name={`isAvailable${todayName}Evening`}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Flex>
          <Divider />

          {/* extra */}
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="flex-start"
          >
            <p style={{ fontSize: 18, padding: 4 }}>{extraValue}</p>
            <div style={{ paddingTop: 4 }}>
              <Form.Item
                name={`extraIsAvailable${todayName}`}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Flex>
          <Divider />
          <Flex justify="flex-end" style={{marginRight: -8}}>
            <CustomButton
              shape="round"
              type="primary"
              htmlType="submit"
              icon={<FontAwesomeIcon icon={faCloudArrowDown} />}
            >
              Save changes{" "}
            </CustomButton>
          </Flex>
        </Form>
      </>
    </Modal>
  );
};

export default CustomModal;
