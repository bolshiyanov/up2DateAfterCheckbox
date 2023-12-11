import React from "react";
import { Form, Input } from "antd";

type Props = {
  addonBefore?: string;
  name: string;
  placeholder: string;
  type?: string;
};

export const CustomInput = ({
  type = 'text',
  name,
  addonBefore,
  placeholder,
}: Props) => {

  const { TextArea } = Input;

  return (
    <Form.Item
      
      name={name}
      rules={[{ required: true, message: "Requied fild" }]}
      //shouldUpdate={ true }
    >
      {name === "description" ? 
      <TextArea rows={4}
        placeholder={placeholder}       
        size="large"
      /> : 
      
      
      <Input
      placeholder={placeholder}
      addonBefore={addonBefore}
      type={ type }
      size="large"
    /> }
    </Form.Item>
  );
};
