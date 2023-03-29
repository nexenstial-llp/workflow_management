import React from 'react'
import { Modal as Mod } from 'antd'

const Modal = ({
    isModalOpen,
    handleCancel,
    handleOk,
    children,
    title,
    width
}) => {
  return (
    <Mod width={width} footer={null} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Mod>
  )
}

export default Modal