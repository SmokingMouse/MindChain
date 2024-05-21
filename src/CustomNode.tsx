import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CustomNode = memo(({ data }: NodeProps) => {
  const isQuestionNode = data.type === 'question';

  return (
    <div
      className={`custom-node ${isQuestionNode ? 'question-node' : 'data-node'}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <h3>{data.label}</h3>
        {isQuestionNode ? (
          <p>这是一个问题节点</p>
        ) : (
          <p>这是一个资料节点</p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export default CustomNode;