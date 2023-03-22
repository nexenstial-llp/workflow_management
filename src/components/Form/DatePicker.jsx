import React from 'react'
import { DatePicker as Date } from 'antd'

const DatePicker = ({
    onChange
}) => {
  return (
    <Date onChange={onChange} />
  )
}

export default DatePicker