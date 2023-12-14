import { morning } from "../../../dummyData";
import { afternoon } from "../../../dummyData";
import { evening } from "../../../dummyData";
import {allTimes } from "../../../dummyData";
import { Item } from "../../../types";
import styles from "./index.module.css";
import CustomTag from "../../custom-tag";

type Props = {
  todayName: string;
  item: Item;
};


export const Schedle = ({ todayName, item }: Props) => {

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
    <div className={styles.main}>
      <CustomTag time={morningValue} available={morningAvailableValue} />
      <CustomTag time={afternoonValue} available={afternoonAvailableValue} />
      <CustomTag time={eveningValue} available={eveningAvailableValue} />
      <CustomTag time={extraValue} available={extraAvailableValue} />
    </div>
  );
};
