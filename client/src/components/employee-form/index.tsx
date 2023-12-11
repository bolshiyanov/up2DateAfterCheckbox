import React from "react";
import { Link } from "react-router-dom";
import { Employee } from "@prisma/client";
import { Form, Card, Space, Row } from "antd";
import { CustomButton } from "../custom-button";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomTypeSelectBoat } from "../custom-type-select/customTypeSelectBoat";
import { CustomTypeSelectPort } from "../custom-type-select/customTypeSelectPort";
import { CustomCheck } from "../custom-input copy";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  btnTextCancel: string;
  btnTextGoBack: string;
  isAvailable: boolean;
  isNewBoat: boolean;
  isBlocked: boolean;
  pageName: string;
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
  isNewBoat,
  isBlocked,
  error,
}: Props<Employee>) => {
  const handleFinish = (values: Employee) => {
    if (values.boatsFoto !== null) {
      if (!values.boatsFoto.includes("https://")) {
        values.boatsFoto = "https://" + values.boatsFoto;
      }
    }

    onFinish(values);
  };

  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form
        name="add-employee"
        autoComplete="off"
        onFinish={pageName === "Add-emploee" ? onFinish : handleFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        initialValues={employee}
      >
        <CustomCheck
          startState={isNewBoat}
          name="isNewBoat"
          pageName={pageName}
          positiveText={"This boat is new in this admin panel"}
          negativeText={"Have you seen this boat before"}
        />
        <CustomCheck
          startState={isBlocked}
          name="isBlocked"
          pageName={pageName}
          positiveText={"The boat is blocked by the super administrator"}
          negativeText={"Available for boats catalog"}
        />
        <CustomCheck
          startState={isAvailable}
          name="isAvailable"
          pageName={pageName}
          positiveText={"This boat is now ready for reservation"}
          negativeText={
            "This boat will be temporarily unavailable for reservations"
          }
        />
        <CustomInput type="text" name="phone" placeholder="Phone" />

        <CustomInput type="text" name="boatsName" placeholder="Boats Name" />
        <CustomInput type="text" name="description" placeholder="Description" />
        {pageName !== "Add-emploee" && (
          <>
            <CustomInput
              addonBefore="https://"
              type="text"
              name="boatsFoto"
              placeholder="Boats Foto Link or any text"
            />

            <CustomTypeSelectBoat name="typeBoat" selectName="Type Boat" />
            <CustomTypeSelectPort name="typePort" selectName="Select port" />

            <CustomInput type="email" name="email" placeholder="Email" />
          </>
        )}
        <Space direction="vertical" size="large">
          <ErrorMessage message={error} />
          <Row align="middle" justify="center">
            <CustomButton shape="round" htmlType="submit">
              {btnText}
            </CustomButton>
            {btnTextCancel !== "" && (
              <CustomButton shape="round" htmlType="reset">
                {btnTextCancel}
              </CustomButton>
            )}
            {btnTextGoBack !== "" && (
              <CustomButton shape="round" htmlType="button">
                <Link to="/">{btnTextGoBack}</Link>
              </CustomButton>
            )}
          </Row>
        </Space>
      </Form>
    </Card>
  );
};
