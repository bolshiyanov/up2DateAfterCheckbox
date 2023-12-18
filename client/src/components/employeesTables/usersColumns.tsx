import { User } from "@prisma/client";
import { formatDateString } from "../../utils/formatDateString";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";




export const UsersColumns: ColumnsType< User> = [
  {
    title: "Date",
    render: (text, record) =>
        
        formatDateString(record.dateRegistration || ""
      ),
    key: "dateRegistration",
    width: 120,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Is Provider?",
    render: (text, record) =>
      record.owner === false ? (
        <Tag color="green">User</Tag>
      ) : (
        <Tag color="blue">Provider</Tag>
      ),
    key: "isAvailable",
    width: 140,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: {
      showTitle: false,
    },
    width: 140,
  },
  {
    title: "Blocked",
    render: (text, record) =>
      record.isBlocked === false ? (
        <Tag color="green">Can be use</Tag>
      ) : (
        <Tag color="volcano">Blocked</Tag>
      ),
    key: "isAvailable",
    width: 140,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: {
      showTitle: false,
    },
    width: 140,
  },
 
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    ellipsis: {
      showTitle: false,
    },
    width: 140,
  },
 

];
