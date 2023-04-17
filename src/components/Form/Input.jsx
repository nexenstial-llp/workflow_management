import React from "react";

const Input = ({
  className,
  value,
  onChange,
  defaultValue,
  readOnly,
  type,
  placeholder,
}) => {
  return (
    <input
      placeholder={placeholder || "this is placeholder"}
      type={type || "text"}
      className={`bg-[#F8FAFC] rounded placeholder:text-[#B8BCCA] text-[#3B4256] p-[10px] focus:outline-0 focus:border-0 ${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
    />
  );
};

export default Input;
