import React from "react";
import { Form, Select } from "antd";
import { ridesTypes } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  rideType: string;
  type?: string;
};

export const CustomTypeSelectStartPoints = ({ name, selectName, rideType}: Props) => {
  return (
    <Form.Item name={name} label={selectName}>
      <Select size="large">
        {ridesTypes
          .find((ride) => ride.key === rideType)?.startPoints.map((startPoint) => (
            <Select.Option key={startPoint.key} value={startPoint.value}>
              {startPoint.name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};
