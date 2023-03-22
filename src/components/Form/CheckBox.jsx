import { Checkbox as Check} from 'antd'
import React from 'react'
import EditableLabel from './EditableLabel'

const CheckBox = (
    onChange,
    title,
    checked
) => {
  return (
    <Check onChange={onChange}>
        <EditableLabel className={'bg-transparent focus:border-b-0'}/>
    </Check>
  )
}

export default CheckBox