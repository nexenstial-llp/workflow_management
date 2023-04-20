import React from "react";
import { TimePicker as Time } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const TimePicker = ({ onChange,yes,value,className }) => {
  dayjs.extend(customParseFormat);

  return (
    <Time
      disabled={yes} 
      inputReadOnly={yes}
      placeholder={value}
      className={className}
      onChange={onChange}
      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
    />
  );
};

export default TimePicker;
