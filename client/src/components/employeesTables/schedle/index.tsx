// Schedle.jsx
import React, { useState } from "react";
import { morning, afternoon, evening, allTimes } from "../../../dummyData";
import { Item } from "../../../types";
import CustomTag from "../../custom-tag";
import CustomModal from "../../custom-modal";

type Props = {
  todayName: string;
  item: Item;
};

export const Schedle = ({ todayName, item  }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  const morningValueKey = (item as Item)[
    `morning${todayName}` as keyof Item
  ] as string;
  const morningValue = morning.find((entry) => entry[morningValueKey])?.[
    morningValueKey
  ] as string;
  const morningAvailableValue = (item as Item)[
    `isAvailable${todayName}Morning` as keyof Item
  ] as boolean;

  const afternoonValueKey = (item as Item)[
    `afternoon${todayName}` as keyof Item
  ] as string;
  const afternoonValue = afternoon.find((entry) => entry[afternoonValueKey])?.[
    afternoonValueKey
  ] as string;
  const afternoonAvailableValue = (item as Item)[
    `isAvailable${todayName}Afternoon` as keyof Item
  ] as boolean;

  const eveningValueKey = (item as Item)[
    `evening${todayName}` as keyof Item
  ] as string;
  const eveningValue = evening.find((entry) => entry[eveningValueKey])?.[
    eveningValueKey
  ] as string;
  const eveningAvailableValue = (item as Item)[
    `isAvailable${todayName}Evening` as keyof Item
  ] as boolean;

  const extraValueKey = (item as Item)[
    `extra${todayName}` as keyof Item
  ] as string;
  const extraValue = allTimes.find((entry) => entry[extraValueKey])?.[
    extraValueKey
  ] as string;
  const extraAvailableValue = (item as Item)[
    `isAvailable${todayName}Extra` as keyof Item
  ] as boolean;

  return (
    <>
      <div onClick={showModal}>
        <CustomTag time={morningValue} available={morningAvailableValue} />
        <CustomTag time={afternoonValue} available={afternoonAvailableValue} />
        <CustomTag time={eveningValue} available={eveningAvailableValue} />
        <CustomTag time={extraValue} available={extraAvailableValue} />
      </div>
      <CustomModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        onCancel={handleCancel}
        todayName={todayName}
        rideName= {item.rideName}
        morningValue={morningValue}
        morningAvailableValue={morningAvailableValue}
        afternoonValue={afternoonValue}
        afternoonAvailableValue={afternoonAvailableValue}
        eveningValue={eveningValue}
        eveningAvailableValue={eveningAvailableValue} 
        extraValue={extraValue}
        extraAvailableValue={extraAvailableValue}
        id={item.id || ""}
        rideFoto={item.rideFoto  || ""}
        startPoints={item.startPoints  || ""}
        rideType={item.rideType  || ""}
      />
    </>
  );
};
