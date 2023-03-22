import React from 'react'

const EditableLabel = ({
  className,
  value,
  onChange,
  defaultValue,
  style
}) => {
  return (
    <input 
    style={style}
    className={`font-400 text-base focus:outline-0 focus:border focus:border-0 focus:border-b-[1px] focus:border-t-0 focus:border-l-0 focus:border-r-0 box-border ${className}`} 
    defaultValue={defaultValue || 'Enter the title'}
    onChange={onChange}
    value={value}
    />
  )
}

export default EditableLabel