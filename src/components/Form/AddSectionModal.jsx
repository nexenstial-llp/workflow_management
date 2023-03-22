import React from 'react'
import Modal from '../Partials/Modal'

const AddSectionModal = ({
    isModalOpen,
    handleCancel,
    handleOk,
}) => {
  return (
    <Modal
    isModalOpen={isModalOpen}
    handleCancel={handleCancel}
    handleOk={handleOk}
    >
        This is modal
    </Modal>
  )
}

export default AddSectionModal