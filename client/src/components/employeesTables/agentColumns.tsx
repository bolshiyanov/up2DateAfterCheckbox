
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

export const agentColumns: ColumnsType<Employee> = [
    {
      title: "Date",
      render: (text, record) =>
        record.isNewRide === true ? (
          <Tag color="green">New</Tag>
        ) : (
          formatDateString(record.dateRegistration)
        ),
      key: "newBoat",
      width: 100,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ride Name",
      dataIndex: "rideName",
      key: "rideName",
      ellipsis: {
        showTitle: false,
      },
      width: 100,
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
      title: "Ride Type",
      render: (_, record) => getRideTypeName(record.rideType),
      key: "rideType ",
      width: 100,
    },
  
    {
      title: "Categoria",
      render: (_, record) => getRideCategoria(record.rideType, record.categorias),
      key: "categorias",
      width: 100,
    },
    {
      title: "Starting from",
      render: (_, record) =>
        getRideStartPoints(record.rideType, record.startPoints),
      key: "startPoints",
      width: 100,
    },
  
    {
      title: "Booking",
      render: (text, record) =>
        record.isAvailable === true ? (
          "Available"
        ) : (
          <Tag color="orange">Blocked</Tag>
        ),
      key: "isAvailable",
      width: 100,
    },
    {
      title: "Blocked",
      render: (text, record) =>
        record.isBlocked === false ? (
          "Available"
        ) : (
          <Tag color="volcano">Blocked</Tag>
        ),
      key: "isAvailable",
      width: 100,
    },
  ];
