import React from "react";
import { Form, Button } from "antd";

type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "primary" | "link" | "text" | "default" | "dashed";
  danger?: boolean;
  loading?: boolean;
  shape?: "circle" | "default" | "round" | undefined;
  icon?: React.ReactNode;
};

export const CustomButton = ({
  children,
  type,
  danger,
  loading,
  htmlType = "button",
  onClick,
  shape,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <div style={{ paddingRight: 8 }}>
        <Button
          type={type}
          htmlType={htmlType}
          danger={danger}
          loading={loading}
          size="middle"
          shape={shape}
          onClick={onClick}
          icon={icon}
        >
          {children}
        </Button>
      </div>
    </Form.Item>
  );
};
