import React from "react";
import { Form, Select } from "antd";
import { portsTypes } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  type?: string;
};

export const CustomTypeSelectPort = ({ name, selectName }: Props) => {
  return (
    <Form.Item
      name={name}
      label={selectName}
      
    >
        <Select size="large">
          {portsTypes.map((portType) => (
            <Select.Option key={portType.key} value={portType.value} defaultValue="Puerto colon">
              {portType.name}
            </Select.Option>
          ))}
        </Select>
      
      
    </Form.Item>
  );
};
