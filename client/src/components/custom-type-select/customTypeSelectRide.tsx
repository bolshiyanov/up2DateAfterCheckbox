import React from "react";
import { Form, Select } from "antd";
import {  ridesTypes } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  type?: string;
};

export const CustomTypeSelectRide = ({ name, selectName }: Props) => {
  return (
    <Form.Item
      name={name}
      label={selectName}
      rules={[{ required: true, message: "Requied fild" }]}
      shouldUpdate={ true }
    >
        <Select size="large">
          {ridesTypes.map((rideType) => (
            <Select.Option key={rideType.key} value={rideType.value} defaultValue="01">
              {rideType.name}
              
            </Select.Option>
          ))}
        </Select>
      
      
    </Form.Item>
  );
};
