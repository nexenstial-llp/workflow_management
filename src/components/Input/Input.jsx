import React from 'react'

const Input = (props) => {
  return (
    <div className="flex flex-col">
      <label className="text-[#333333] opacity-70  text-[16px]">{props?.label}</label>
      <input name={props?.name} type={props?.type} className={"border-[1px] text-[14px] rounded-[4px] p-[10px] mt-[5px] " + props?.className} placeholder={props?.placeholder} value={props.value || ""} onChange={props?.handleChange} onBlur={props?.onBlur} disabled={Boolean(props?.disabled) || false} />
      {
        props?.errTxt && <label className=" mt-[3px] animate-shake-fast font-sfTextSemiBold text-sm text-red-600">{props?.errTxt} </label>
      }
    </div>
  )
}

export default Input;