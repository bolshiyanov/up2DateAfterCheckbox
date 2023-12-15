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
import { Schedle } from "./schedle";

const today = new Date();
const todayName = getDayName(today);
const nextTodayName = getNextDayName(today, 1);
const nextTwoTodayName = getNextDayName(today, 2);
const nextThteeTodayName = getNextDayName(today, 3);
const nextFourTodayName = getNextDayName(today, 4);
const nextFiveTodayName = getNextDayName(today, 5);
const nextSixTodayName = getNextDayName(today, 6);

export const SuperAdminColumns: ColumnsType<Employee> = [
  {
    title: "Date",
    render: (text, record) =>
      record.isNewRide === true ? (
        <Tag color="green">New</Tag>
      ) : (
        formatDateString(record.dateRegistration)
      ),
    key: "newBoat",
    width: 120,
    ellipsis: {
      showTitle: false,
    },
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
    width: 90,
  },

  {
    title: "Ride Name",
    dataIndex: "rideName",
    key: "rideName",
    ellipsis: {
      showTitle: false,
    },
    width: 140,
  },
  {
    title: "Blocked",
    render: (text, record) =>
      record.isBlocked === false ? (
        <Tag color="green">Can be used in Up2Date</Tag>
      ) : (
        <Tag color="volcano">Awaiting modarantion</Tag>
      ),
    key: "isAvailable",
    width: 170,
  },
  {
    title: "Ride Type",
    render: (_, record) => getRideTypeName(record.rideType),
    key: "rideType ",
    width: 160,
  },

  {
    title: "Categoria",
    render: (_, record) => getRideCategoria(record.rideType, record.categorias),
    key: "categorias",
    width: 160,
  },
  {
    title: "Starting from",
    render: (_, record) =>
      getRideStartPoints(record.rideType, record.startPoints),
    key: "startPoints",
    width: 160,
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
];
