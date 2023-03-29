import React from 'react'
import { Switch as Sw} from 'antd';

const Switch = ({
    onChange,
    className,
    size,
    checked
}) => {
  return (
    <Sw 
    className={` ${className}`} 
    size={size} 
    defaultChecked 
    onChange={onChange} 
    checked={checked}
    />
  )
}

export default Switch