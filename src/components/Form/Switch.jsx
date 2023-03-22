import React from 'react'
import { Switch as Sw} from 'antd';

const Switch = ({
    onChange,
    className,
    size
}) => {
  return (
    <Sw className={` ${className}`} size={size} defaultChecked onChange={onChange} />
  )
}

export default Switch