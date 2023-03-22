import React from 'react'
import { Select as Sel } from 'antd'

const Select = ({
    handleChange
}) => {
  return (
    <Sel
      defaultValue="lucy"
      className='bg-transparent'
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}
    />
  )
}

export default Select