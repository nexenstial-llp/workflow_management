import React from 'react'

const EditableLabel = ({
  className,
  value,
  name,
  readOnly,
  onChange,
  defaultValue,
  style
}) => {
  return (
    <input 
    style={style}
    className={`font-400 text-base focus:outline-0 focus:border focus:border-b-[1px] focus:border-t-0 focus:border-l-0 focus:border-r-0 box-border ${className}`} 
    defaultValue={defaultValue}
    onChange={onChange}
    name={name}
    readOnly={readOnly}
    value={value}
    placeholder='Enter Input Label'
    type="text"
    />
  )
}

export default EditableLabel