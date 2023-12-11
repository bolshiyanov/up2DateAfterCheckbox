import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "@prisma/client";
import { Card, Checkbox, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/serivices/auth";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser({
        ...data,
        owner: owner
      }).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Uncnoun error");
      }
    }
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setOwner(e.target.checked);
  };

 

  return (
    <Layout>
      <Row align="middle" justify="center" style={{ margin: 16 }}>
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <Row align="middle" justify="start">
              <div style={{marginBottom:8, marginRight: 8}}>
                <Typography.Text>Are you a boat owner? </Typography.Text>
              </div>
              <div style={{marginBottom:8}}>
                <Checkbox onChange={onChange}></Checkbox>
                
              </div>
            </Row>
            <CustomInput type="text" name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <CustomInput type="phone" name="phone" placeholder="Phone" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit">
              Confirm
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already registered? <Link to={Paths.login}>Log in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
