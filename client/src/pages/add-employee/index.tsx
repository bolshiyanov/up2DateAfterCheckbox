import { Row } from "antd";
import { useState } from "react";
import { EmployeeForm } from "../../components/employee-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAddEmployeeMutation } from "../../app/serivices/employees";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addEmployee] = useAddEmployeeMutation();
  
  let isNewBoat = true;
  let isAvailable = true;
  let isBlocked = false;
  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddEmployee = async (data: Employee) => {
     try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknon error");
      }
    }
  };
  
  return (
    <Layout>
      <Row align="middle" justify="center" style={{ margin: 16 }}>
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Add ride"
          btnText="Upload"
          btnTextCancel="Reset"
          btnTextGoBack="Go back"
          isAvailable={isAvailable}
          isNewBoat={isNewBoat}
          isBlocked={isBlocked}
          pageName="Add-emploee"
          error={ error }
        />
      </Row>
    </Layout>
  );
};
