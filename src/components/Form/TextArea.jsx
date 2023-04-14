import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextArea = ({
    className,
  value,
  onChange,
  defaultValue,
  type,
  placeholder,
  readOnly
}) => {
  return (
    <ReactQuill
    theme="snow" 
    placeholder={placeholder || 'Enter Your Answer'} 
    type={type||"text"} 
    className={` rounded placeholder:text-[#B8BCCA] text-[#3B4256] focus:outline-0 focus:border-0 mb-5 ${className}`}
    defaultValue={defaultValue}
    onChange={(e) => onChange(e)}
    value={value}
    readOnly={readOnly}
    />
  )
}

export default TextArea