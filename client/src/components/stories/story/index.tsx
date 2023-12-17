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
  const selectedIds = useSelector((state: RootState) => state.selectedIds.selectedIds);
  const value = useSelector((state: RootState) => state.selectedGlobalCategory.value);
  console.log('selectedIds Story', selectedIds)
 
  const isSelected = selectedIds.includes(id);

  const onClick = () => {
    dispatch(toggleId(id));
    
  };
  
  return (
    value !== null && type === value ? (
      <Card
        hoverable
        style={{
          width: 200,
          height: 300,
          border: isSelected ? "3px solid #007aff" : "2px solid #003747",
        }}
        cover={<img alt={`${type}, ${name}`} src={foto} style={{ width: 196, height: 200 }} />}
       
      >
        <Meta title={name} description={type} />
      </Card>
    ) : null
  );
};

export default Story;
