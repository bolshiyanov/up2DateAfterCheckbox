import React from "react";

import { Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  time: string;
  available: boolean;
};
const CustomTag = ({ time, available }: Props) => (
  <>
    {available && !time.includes("off") ? (
      <Tag
        icon={<FontAwesomeIcon icon={faClock} />}
        color="success"
      >{`${"\u00A0"}${time}`}</Tag> 
    ) : (
      <Tag
        icon={<FontAwesomeIcon icon={faCircleXmark} />}
        color="error"
      >{`${"\u00A0"}${time}`}</Tag>
    )}
  </>
);

export default CustomTag;
