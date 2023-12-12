import React, { useState } from "react";
import { Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type Props = {
  pageName: string;
  startState: boolean;
  name: string;
  positiveText: string;
  negativeText: string;
};

export const CustomCheck = ({
  startState,
  name,
  pageName,
  positiveText,
  negativeText
}: Props) => {
  const [isChecked, setIsChecked] = useState(startState);
  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      {pageName === "Edit-emploee" && (
        <Form.Item
          name={name}
          wrapperCol={{ span: 24 }}
          valuePropName="checked"
        >
          <Checkbox onChange={onChange} checked={isChecked}>
            {isChecked
              ?  positiveText 
              : negativeText}
          </Checkbox>
        </Form.Item>
      )}
    </>
  );
};