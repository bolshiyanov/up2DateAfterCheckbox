import React from "react";
import { Switch, Form, Flex, Divider } from "antd";

type Props = {
  pageName: string;
  name: string;
  text: string
};

export const CustomCheck = ({ name, pageName,text }: Props) => {
  return (
    <>
      {pageName === "Edit-emploee" && (
        <>
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="flex-start"
          >
            <p style={{ fontSize: 16 }}>{text}</p>
            <div style={{ marginBottom: -16 }}>
              <Form.Item
                name={name}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </Flex>

          <Divider/>
        </>
      )}
    </>
  );
};
