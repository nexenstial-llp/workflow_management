import React from 'react'
import { DatePicker as Date } from 'antd'

const DatePicker = ({
    onChange,
    value,
    className,
    yes,
}) => {
  return (
    <Date onChange={onChange} className={className} placeholder={value} disabled={yes} inputReadOnly={yes}/>
  )
}

export default DatePicker