// CustomModal.tsx
import React, { useState } from "react";
import {
  Divider,
  Flex,
  Modal,
  Spin,
  Switch,
  Typography,
} from "antd";
import { useGetEmployeeQuery } from "../../app/serivices/employees";

import { getRideStartPoints } from "../../utils/getRideTypes";

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
  const { data, isLoading } = useGetEmployeeQuery(id || "");

  const [morningAvailable, setMorningAvailable] = useState(
    morningAvailableValue
  );
  const [afternoonAvailable, setAfternoonAvailable] = useState(
    afternoonAvailableValue
  );
  const [eveningAvailable, setEveningAvailable] = useState(
    eveningAvailableValue
  );
  const [extraAvailable, setExtraAvailable] = useState(extraAvailableValue);

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
  console.log(' data CustomModal', data)

  //   const handleEditUser = async (employee: Employee) => {
  //     try {
  //       const editedEmployee = {
  //         ...data,
  //         ...employee,
  //       };

  //       await editEmployee(editedEmployee).unwrap();

  //       navigate(`${Paths.status}/created`);
  //     } catch (err) {
  //       const maybeError = isErrorWithMessage(err);

  //       if (maybeError) {
  //         setError(err.data.message);
  //       } else {
  //         setError("Unknown error");
  //       }
  //     }
  //   };
  const { Title } = Typography;

  const genNameMorningAvailableValue = `isAvailable${todayName}Morning`;

  const genNameAfternoonAvailableValue = `isAvailable${todayName}Afternoon`;

  const genNameEveningAvailableValue = `isAvailable${todayName}Evening`;

  const genNameExtraAvailableValue = `isAvailable${todayName}Extra`;

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Upload Changes to server"
      cancelText='Go Back'
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
              {rideName} from {getRideStartPoints(rideType , startPoints) }
            </Title>
          </div>
        </Flex>
        <Divider />

        {/* morning */}
        <Flex
          style={{ width: "100%" }}
          justify="space-between"
          align="flex-start"
        >
          <p style={{ fontSize: 18, padding: 4 }}>{morningValue}</p>
          <div style={{ paddingTop: 4 }}>
            <Switch />
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
            <Switch />
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
            <Switch />
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
            <Switch />
          </div>
        </Flex>
        <Divider />
      </>
    </Modal>
  );
};

export default CustomModal;
