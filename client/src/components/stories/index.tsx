import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { toggleId } from "../../features/selectedStory/selectedStorySlice";
import Story from "./story";

import { ridesTypes } from "../../dummyData";  // Import ridesTypes from the correct path

import "./index.css";

interface StoriesProps {}

interface TransformedData {
  type: string;
  id: string;
  foto: string;
  name: string;
}

const transformData = (originalArray: typeof ridesTypes): TransformedData[] => {
  const newArray: TransformedData[] = [];

  originalArray.forEach((root) => {
    root.categorias.forEach((categoria) => {
      newArray.push({
        type: root.name,
        id: categoria.key,
        foto: categoria.foto,
        name: categoria.name,
      });
    });
  });

  return newArray;
};

const Stories: React.FC<StoriesProps> = () => {
  const resultArray: TransformedData[] = transformData(ridesTypes);
  const selectedIds = useSelector((state: RootState) => state.selectedIds.selectedIds);
  const dispatch: AppDispatch = useDispatch();

  const handleStoryClick = (id: string) => {
    dispatch(toggleId(id));
  };

  return (
    <div
      className="no-scrollbar"
      style={{
        display: "block",
        overflowX: "scroll",
        whiteSpace: "nowrap",
        width: "100%",
        maxWidth: "100%",
        marginBottom: 16,
      }}
    >
      {resultArray.map((story) => (
        <div
          key={story.id}
          className={`no-scrollbar ${selectedIds.includes(story.id) ? "selected" : ""}`}
          style={{ margin: 4, display: "inline-block" }}
          onClick={() => handleStoryClick(story.id)}
        >
          <Story
            type={story.type}
            id={story.id}
            foto={story.foto}
            name={story.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Stories;
