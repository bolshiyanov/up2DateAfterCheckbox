import React, { ChangeEvent } from "react";
import { Form, Input } from "antd";

interface CustomEmailInputProps {
  onChange?: (value: string) => void;
}

export const CustomEmailInput: React.FC<CustomEmailInputProps> = ({ onChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lowercaseValue = e.target.value.toLowerCase();
    if (onChange) {
      onChange(lowercaseValue);
    }
  };

  const formatValue = (e: ChangeEvent<HTMLInputElement>) => e.target.value.toLowerCase();

  return (
    <Form.Item
      name="email"
      getValueFromEvent={formatValue}
      rules={[{ required: true, message: "Invalid email format" }]}
      shouldUpdate={true}
    >
      <Input
        onChange={handleInputChange}
        placeholder="Add your email"
        type="email"
        size="large"
      />
    </Form.Item>
  );
};
