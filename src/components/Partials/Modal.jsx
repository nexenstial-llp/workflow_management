import React from 'react'
import { Modal } from 'antd'

const Index = ({
    isModalOpen,
    handleCancel,
    handleOk,
    children
}) => {
  return (
    <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
  )
}

export default Index