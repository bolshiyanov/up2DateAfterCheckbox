// Story.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { RootState, AppDispatch } from "../../../app/store";
import { toggleId } from "../../../features/selectedStory/selectedStorySlice";

const { Meta } = Card;

interface StoryProps {
  id: string;
  foto: string;
  type: string;
  name: string;
}

const Story: React.FC<StoryProps> = ({ id, foto, type, name }) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.selectedIds.selectedId);
  const isSelected = selectedId === id;

  const onClick = () => {
    dispatch(toggleId(id));
  };

  return (
    <Card
      hoverable
      style={{
        width: 200,
        height: 300,
        border: isSelected ? "3px solid #007aff" : "2px solid #003747",
      }}
      cover={<img alt={`${type}, ${name}`} src={foto} style={{ width: 196, height: 200 }} />}
      onClick={onClick}
    >
      <Meta title={name} description={type} />
    </Card>
  );
};

export default Story;
