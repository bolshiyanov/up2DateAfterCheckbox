import { Employee } from "@prisma/client";
import type { ColumnsType } from "antd/es/table";
import {
  getRideStartPoints,
} from "../../utils/getRideTypes";

import { getDayName, getNextDayName } from "../../utils/getDayName";
import { Schedle } from "./schedle";
import { Tag } from "antd";

const today = new Date();
const todayName = getDayName(today);
const nextTodayName = getNextDayName(today, 1);
const nextTwoTodayName = getNextDayName(today, 2);
const nextThteeTodayName = getNextDayName(today, 3);
const nextFourTodayName = getNextDayName(today, 4);
const nextFiveTodayName = getNextDayName(today, 5);
const nextSixTodayName = getNextDayName(today, 6);



export const ProviderColumns: ColumnsType<Employee> = 
[
  {
    title: "Ride Name",
    dataIndex: "rideName",
    key: "rideName",
    ellipsis: {
      showTitle: false,
    },
    width: 110,
    fixed: "left",
  },
  {
    title: "Photo",
    render: (record) => (
      <div
        style={{
          width: 90,
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(29, 29, 29, 0.8)",
        }}
      >
        <img
          src={record.rideFoto || ""}
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: 6
          }}
        />
      </div>
    ),
    key: "rideFoto",
    width: 120,
  },

  {
    title: "Starting from",
    render: (_, record) =>
      getRideStartPoints(record.rideType  || "", record.startPoints || ""),
    key: "startPoints",
    width: 110,
  },
  {
    title: todayName,
    render: (_, record) => <Schedle todayName={todayName} item={record}  />,
    key: todayName,
    width: 150,
  },

  {
    title: nextTodayName,
    render: (_, record) => <Schedle todayName={nextTodayName} item={record}  />,
    key: nextTodayName,
    width: 150,
  },
  {
    title: nextTwoTodayName,
    render: (_, record) => <Schedle todayName={nextTwoTodayName} item={record}  />,
    key: nextTwoTodayName,
    width: 150,
  },
  {
    title: nextThteeTodayName,
    render: (_, record) => <Schedle todayName={nextThteeTodayName} item={record}  />,
    key: nextThteeTodayName,
    width: 150,
  },
  {
    title: nextFourTodayName,
    render: (_, record) => <Schedle todayName={nextFourTodayName} item={record}  />,
    key: nextFourTodayName,
    width: 150,
  },
  {
    title: nextFiveTodayName,
    render: (_, record) => <Schedle todayName={nextFiveTodayName} item={record} />,
    key: nextFiveTodayName,
    width: 150,
  },
  {
    title: nextSixTodayName,
    render: (_, record) => <Schedle todayName={nextSixTodayName} item={record}  />,
    key: nextSixTodayName,
    width: 150,
  },
  {
    title: "Open for book",
    render: (text, record) =>
      record.isAvailable === true ? (
        <Tag color="green">Open for booking</Tag>
      ) : (
        <Tag color="volcano">You has blocked</Tag>
      ),
    key: "isAvailable",
    width: 180,
  },
  {
    title: "Blocked",
    render: (text, record) =>
      record.isBlocked === false ? (
        <Tag color="green"> Can be used in Up2Date</Tag>
      ) : (
        <Tag color="volcano">Admin has blocked</Tag>
      ),
    key: "isBlocked",
    width: 180,
  },
];
