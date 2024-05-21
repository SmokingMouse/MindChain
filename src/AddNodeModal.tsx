import React, { useState } from 'react';

interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (type: 'question' | 'data', x: number, y: number) => void;
  setNodeType: (type: 'question' | 'data') => void;
}

const AddNodeModal: React.FC<AddNodeModalProps> = ({
  isOpen,
  onClose,
  onAddNode,
  setNodeType,
}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleAddNode = (type: 'question' | 'data') => {
    setNodeType(type);
    onAddNode(type, x, y);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>添加新节点</h2>
        <div>
          <button onClick={() => handleAddNode('question')}>问题节点</button>
          <button onClick={() => handleAddNode('data')}>资料节点</button>
        </div>
        <button onClick={onClose}>取消</button>
      </div>
    </div>
  );
};

export default AddNodeModal;