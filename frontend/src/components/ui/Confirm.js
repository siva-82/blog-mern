import React, { useState } from 'react'
import { Button, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


const Confirm = ({showModal, handleCancel ,handleDelete}) => {
    
  
  return (
    <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header >
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure to Delete this </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Confirm