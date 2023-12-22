import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  AppDispatch } from "../../app/store";
import { v4 as uuidv4 } from 'uuid';
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
import { CustomEmailInput } from "../../components/custom-email-input";
import { setIsAgent, setIsProvider, setIsSuperAdmin } from "../../features/typeUser/typeUserSlice";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const dispatch: AppDispatch = useDispatch();
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
      // Generate a unique UUID
      const deviceId = uuidv4();

      

      await registerUser({
        ...data,
        owner: owner,
        deviceId: owner ? "" : deviceId, // Use the deviceId if not an owner
      }).unwrap();
      const handleUserRole = () => {
        console.log('data.owner  registration', data.owner );
        if (owner === true) {
          dispatch(setIsProvider());
          localStorage.setItem('deviceId', "" );
        } else if (
          data.email === 'atis.hofeins@gmail.com' ||
          data.email === 'bolshiyanov@gmail.com'
        ) {
          dispatch(setIsSuperAdmin());
        } else {
          dispatch(setIsAgent());
          localStorage.setItem('deviceId', deviceId);
        }
      };
      handleUserRole();
      navigate('/');


    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
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
              <div style={{ marginBottom: 8, marginRight: 8 }}>
                <Typography.Text>Are you the ride owner? </Typography.Text>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Checkbox onChange={onChange}></Checkbox>
              </div>
            </Row>
            <p style={{fontSize: 10, marginBottom: 8, color: 'lightgray'}}>
              If you check here [v] it means that you are the owner of, for
              example, a boat, paraglider or other rides
            </p>
            <CustomInput type="text" name="name" placeholder="Name" />
            <CustomEmailInput />
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
