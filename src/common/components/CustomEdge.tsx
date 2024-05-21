import React from 'react';
import { EdgeProps, getBezierPath, getMarkerEnd, MarkerType } from 'react-flow-renderer';

interface CustomEdgeProps extends EdgeProps {
  arrowHeadType?: MarkerType;
  markerEndId?: string;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default CustomEdge;
