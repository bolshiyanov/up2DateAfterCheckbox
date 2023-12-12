import React from "react";
import { Form, Select } from "antd";
import { afternoon } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  type?: string;
};


export const CustomSelectAfternoonPicker = ({ name, selectName }: Props) => {
  return (
    <Form.Item name={name} label={selectName}>
      <Select size="large">
        {afternoon.map((time) => (
          <Select.Option key={Object.keys(time)[0]} value={Object.keys(time)[0]}>
            {Object.values(time)[0]}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
