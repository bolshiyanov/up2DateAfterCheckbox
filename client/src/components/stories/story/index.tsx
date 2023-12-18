// Story.tsx
import React from "react";
import {  useSelector } from "react-redux";
import { Card } from "antd";
import { RootState,} from "../../../app/store";

const { Meta } = Card;

interface StoryProps {
  id: string;
  foto: string;
  type: string;
  name: string;
}

const Story: React.FC<StoryProps> = ({ id, foto, type, name }) => {
  
  const selectedIds = useSelector((state: RootState) => state.selectedIds.selectedIds);
  const value = useSelector((state: RootState) => state.selectedGlobalCategory.value);
 
 
  const isSelected = selectedIds.includes(id);

    
 
  
  return (
    value !== null && type === value ? (
      <Card
        hoverable
        style={{
          width: 200,
          height: 300,
          border: isSelected ? "3px solid #007aff" : "3px solid #003747",
        }}
        cover={<img alt={`${type}, ${name}`} src={foto} style={{ width: 196, height: 200 }} />}
       
      >
        <Meta title={name} description={type} />
      </Card>
    ) : null
  );
};

export default Story;
