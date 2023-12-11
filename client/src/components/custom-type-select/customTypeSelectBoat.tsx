import React from "react";
import { Form, Select } from "antd";
import { boatsTypes } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  type?: string;
};

export const CustomTypeSelectBoat = ({ name, selectName }: Props) => {
  return (
    <Form.Item
      name={name}
      label={selectName}
      rules={[{ required: true, message: "Required field" }]}
      
    >
        <Select size="large">
          {boatsTypes.map((boatType) => (
            <Select.Option key={boatType.key} value={boatType.value} >
              {boatType.name}
            </Select.Option>
          ))}
        </Select>
      
      
    </Form.Item>
  );
};
