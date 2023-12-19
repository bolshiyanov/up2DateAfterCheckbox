import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, Flex, Form, Modal, Row, Space } from "antd";
import { Layout } from "../../components/layout";
import { CustomButton } from "../../components/custom-button";
import {
  faChevronLeft,
  faCloudArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "../../components/error-message";
import { CustomInput } from "../../components/custom-input";

export const EditComment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleFinish = () => {};

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = () => {
    hideModal();
  };

  return (
    <Layout>
      <Row align="middle" justify="center" style={{ margin: 16 }}>
        <Card title="Edit Comment" style={{ width: "30rem" }}>
          <Form
            name="add-comment"
            autoComplete="off"
            onFinish={handleFinish}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <CustomInput type="text" name="description" placeholder="Your comment to myself" />
            <Space direction="vertical" size="large">
              <ErrorMessage message={error} />
              <Flex align="middle" justify="center">
                <CustomButton
                  shape="round"
                  htmlType="button"
                  icon={<FontAwesomeIcon icon={faChevronLeft} />}
                >
                  <Link to="/">Go back</Link>
                </CustomButton>

                <CustomButton
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  icon={<FontAwesomeIcon icon={faCloudArrowDown} />}
                >
                  Save
                </CustomButton>

                <CustomButton
                  shape="round"
                  danger
                  onClick={showModal}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Remove
                </CustomButton>
              </Flex>
            </Space>
          </Form>
        </Card>
      </Row>
      <Modal
        title="Confirm remove"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you really want to remove this comment?
      </Modal>
    </Layout>
  );
};
