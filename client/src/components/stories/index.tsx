import React, { useEffect, useState } from "react";
import { ridesTypes } from "../../dummyData";
import Story from "./story";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
  const [numberOfSlides, setNumberOfSlides] = useState<number>(0);
  const resultArray: TransformedData[] = transformData(ridesTypes);

  useEffect(() => {
    const calculateNumberOfSlides = () => {
      const slideWidth = 200; 
      const screenWidth = window.innerWidth;
      const calculatedSlides = Math.floor(screenWidth / slideWidth);
      setNumberOfSlides(calculatedSlides);
    };
    calculateNumberOfSlides();
    window.addEventListener("resize", calculateNumberOfSlides);
    return () => {
      window.removeEventListener("resize", calculateNumberOfSlides);
    };
  }, []);

  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView={numberOfSlides}>
        {resultArray.map((story) => (
          <SwiperSlide key={story.id}>
            <Story
              type={story.type}
              id={story.id}
              foto={story.foto}
              name={story.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
