import React from "react";
import { Form, Select } from "antd";
import { ridesTypes } from "../../dummyData";

type Props = {
  name: string;
  selectName: string;
  rideType: string;
  type?: string;
};


export const CustomTypeSelectCategoria = ({ name, selectName, rideType }: Props) => {
  return (
    <Form.Item name={name} label={selectName}>
      <Select size="large">
        {ridesTypes
          .find((ride) => ride.key === rideType)?.categorias.map((categoria) => (
            <Select.Option key={categoria.key} value={categoria.value}>
              {categoria.name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};
