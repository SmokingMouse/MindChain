import React from 'react';

import Modal from 'react-modal'

import './EditNodeModal.css'

interface EditNodeModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  saveChanges: () => void;
  newLabel: string;
  setNewLabel: (label: string) => void;
}

const EditNodeModal: React.FC<EditNodeModalProps> = ({ 
  modalIsOpen, 
  closeModal, 
  saveChanges, 
  newLabel, 
  setNewLabel 
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Node"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Edit Node</h2>
      <label>
        Label:
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
      </label>
      <button onClick={saveChanges}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );
};

export default EditNodeModal;