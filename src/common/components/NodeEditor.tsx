import React, { memo, useState } from 'react';
import { Node, Handle, Position } from 'reactflow';

interface NodeEditorProps {
  id: string;
  data: any;
  isConnectable: boolean;
  onChange: (id: string, data: any) => void;
}

const NodeEditor = ({ id, data, isConnectable, onChange }: NodeEditorProps) => {
  const [editingText, setEditingText] = useState(data.label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  const handleBlur = () => {
    onChange(id, { ...data, label: editingText });
  };

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <input
        type="text"
        value={editingText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default memo(NodeEditor);