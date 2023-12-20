import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Row, Space, Typography } from "antd";
import {
  useDeviceIsLoginMutation,
  useLoginMutation,
  UserData,
} from "../../app/serivices/auth";
import { CustomButton } from "../../components/custom-button";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { CustomEmailInput } from "../../components/custom-email-input";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);

  const [loginUser, loginUserResult] = useLoginMutation();

  const [deviceIdloginUser, deviceIdloginUserResult] =
    useDeviceIsLoginMutation();

  const [normalLoginEnter, setNormalLoginEnter] = useState(false);
  const { Title } = Typography;
  const deviceId = localStorage.getItem("deviceId");

  const deviceIdLogin = async (data: UserData) => {
    try {
      await deviceIdloginUser({ ...data, deviceId }).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      setNormalLoginEnter(true);
      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
        setNormalLoginEnter(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    console.log("user Login", user);
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      const deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);

      await loginUser({ ...data, deviceId }).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center" style={{ margin: 16 }}>
        <Card title="Log in" style={{ width: "30rem" }}>
          {deviceId !== "" && !normalLoginEnter && (
            <Form onFinish={deviceIdLogin}>
              <CustomButton
                shape="round"
                type="primary"
                htmlType="submit"
                loading={deviceIdloginUserResult.isLoading}
              >
                Log in with your device Id
              </CustomButton>
            </Form>
          )}

          {deviceId !== null && normalLoginEnter && (
            <Title level={5} style={{ color: "red", padding: 0 }}>
              Your username and password are already in use on another device.
              But you can log in using your username and password. The other
              device will be disabled.
            </Title>
          )}

          {normalLoginEnter && (
            <Form onFinish={login}>
              <CustomEmailInput />
              <PasswordInput name="password" placeholder="Passowrd" />
              <CustomButton
                shape="round"
                type="primary"
                htmlType="submit"
                loading={loginUserResult.isLoading}
              >
                Log in
              </CustomButton>
            </Form>
          )}
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Sugn up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
