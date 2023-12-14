import { Employee } from "@prisma/client";
import { formatDateString } from "../../utils/formatDateString";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import {
  getRideCategoria,
  getRideStartPoints,
  getRideTypeName,
} from "../../utils/getRideTypes";

import { getDayName, getNextDayName } from "../../utils/getDayName";

const today = new Date();
const todayName = getDayName(today);
const nextTodayName = getNextDayName(today, 1);
const nextTwoTodayName = getNextDayName(today, 2);
const nextThteeTodayName = getNextDayName(today, 3);
const nextFourTodayName = getNextDayName(today, 4);
const nextFiveTodayName = getNextDayName(today, 5);
const nextSixTodayName = getNextDayName(today, 6);

export const agentColumns: ColumnsType<Employee> = [
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
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(29, 29, 29, 0.8)",
        }}
      >
        <img
          src={record.rideFoto}
          alt="Description"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    ),
    key: "rideFoto",
    width: 80,
  },

  {
    title: "Starting from",
    render: (_, record) =>
      getRideStartPoints(record.rideType, record.startPoints),
    key: "startPoints",
    width: 110,
  },
  {
    title: todayName,
    render: (_, record) => <p> </p>,
    key: todayName,
    width: 110,
  },

  {
    title: nextTodayName,
    render: (_, record) => <p> </p>,
    key: nextTodayName,
    width: 110,
  },
  {
    title: nextTwoTodayName,
    render: (_, record) => <p> </p>,
    key: nextTwoTodayName,
    width: 110,
  },
  {
    title: nextThteeTodayName,
    render: (_, record) => <p> </p>,
    key: nextThteeTodayName,
    width: 110,
  },
  {
    title: nextFourTodayName,
    render: (_, record) => <p> </p>,
    key: nextFourTodayName,
    width: 110,
  },
  {
    title: nextFiveTodayName,
    render: (_, record) => <p> </p>,
    key: nextFiveTodayName,
    width: 110,
  },
  {
    title: nextSixTodayName,
    render: (_, record) => <p> </p>,
    key: nextSixTodayName,
    width: 110,
  },
];
