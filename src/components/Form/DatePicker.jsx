import React from 'react'
import { DatePicker as Date } from 'antd'

const DatePicker = ({
    onChange,
    value,
    yes,
}) => {
  return (
    <Date onChange={onChange} placeholder={value} disabled={yes} inputReadOnly={yes}/>
  )
}

export default DatePicker