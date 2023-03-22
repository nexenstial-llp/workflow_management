import React from 'react'
import { TimePicker as Time } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const TimePicker = ({
    onChange
}) => {

    dayjs.extend(customParseFormat);

  return (
    <Time onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
  )
}

export default TimePicker