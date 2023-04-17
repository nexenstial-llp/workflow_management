import React from "react";
import { TimePicker as Time } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const TimePicker = ({ onChange,yes,value }) => {
  dayjs.extend(customParseFormat);

  return (
    <Time
      disabled={yes} 
      inputReadOnly={yes}
      placeholder={value.slice(0,8)}
      onChange={onChange}
      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
    />
  );
};

export default TimePicker;
