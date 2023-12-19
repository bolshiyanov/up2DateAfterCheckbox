import { useState } from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { Card, Flex,  Modal, Row, Space } from "antd";
import { Layout } from "../../components/layout";
import { CustomButton } from "../../components/custom-button";
import {
  faChevronLeft,
  faCloudArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "antd/es/input/TextArea";
import { editComments, removeComment } from "../../features/commentSlice/commentSlice";

export const EditComment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const id = useParams<{ id: string }>();
  const comments = useSelector((state: RootState) => state.comments.comments);

  const dispatch: AppDispatch = useDispatch();

  const commentObject = comments.find(comment => comment.id === id.id);
  const currentComment = commentObject?.description

  
  const onSave = () => {
    dispatch(editComments({ id: String(id.id), description: value }));
    navigate("/");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleDeleteComment = () => {
    dispatch(removeComment(String(id.id)));
    hideModal();
  };

  return (
    <Layout>
      <Row align="middle" justify="center" style={{ margin: 16 }}>
        <Card title="Add comment" style={{ width: "30rem" }}>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)} // Handle onChange to update the state
            rows={4}
            placeholder="Your comment to myself"
            maxLength={60}
            defaultValue={currentComment}
          />

          <Space direction="vertical" size="large" style={{paddingTop:16}}>
            <Flex align="middle" justify="center" >
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
                onClick={onSave}
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
        </Card>
      </Row>
      <Modal
        title="Confirm remove"
        open={isModalOpen}
        onOk={handleDeleteComment}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you really want to remove this comment?
      </Modal>
    </Layout>
  );
};
