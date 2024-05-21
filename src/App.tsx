import React, { useState, useCallback, useRef, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  NodeChange,
  MiniMap,
  Controls,
  ReactFlowInstance,
  Position,
  XYPosition
} from 'reactflow';
import 'reactflow/dist/style.css';
import EditNodeModal from './common/components/EditNodeModal';
import CustomNode  from './common/components/CustomNode';
import AddNodeModal from './common/components/AddNodeModal';
import CustomEdge  from './common/components/CustomEdge';
import './App.css';
// import './common/components/CustomNode.css';
import './common/components/CustomEdge.css';
// import './common/components/EditNodeModal.css';
// import './common/components/AddNodeModal.css';


const initNodes = [
  {
    id: '1',
    data: { label: 'Node A' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    data: { label: 'Node B' },
    position: { x: 250, y: 50 },
  },
];

const edgeTypes = {
  'custom': CustomEdge,
};

const initEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'custom', arrowHeadType: 'arrowclosed', animated: true },
];


const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [nodeType, setNodeType] = useState<'question' | 'data'>('question');
  const [doubleClickPos, setDoubleClickPos] = useState<XYPosition | null>(null)

  const onConnect = (params: any) => setEdges((els) => addEdge({ ...params, type: 'custom', arrowHeadType: 'arrowclosed' }, els));



  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNewLabel(node.data.label);
    setModalIsOpen(true);
  };

  const handleSave = () => {
    if (selectedNode) {
      setNodes((els) =>
        els.map((el) => {
          if (el.id === selectedNode.id) {
            el.data = { ...el.data, label: newLabel };
          }
          return el;
        })
      );
    }
    setModalIsOpen(false);
  };

  const handleAddNode = (type: 'question' | 'data') => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}`, type },
      position: doubleClickPos || { x: 0, y: 0 },
      type: 'customNode',
    };
    addNode(newNode.position.x, newNode.position.y)
    // setNodes((els) => els.concat(newNode));
    setShowAddNodeModal(false);
  };

  const addNode = (x: number, y: number) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: x, y: y },
    };
    setNodes((els) => els.concat(newNode));
  };

  const handlePaneClick = (event: React.MouseEvent) => {
    setClickCount((prevCount) => prevCount + 1);
    setTimeout(() => {
      setClickCount(0);
    }, 300); // 重置双击计数器的时间间隔（毫秒）

    if (clickCount === 1 && reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.pageX,
        y: event.pageY,
      });
      setDoubleClickPos(position)
      // addNode(position.x, position.y)
      setShowAddNodeModal(true);
    }
  };

  const onInstanceLoad = (instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  };

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  return (
    <ReactFlowProvider>
      <div 
        className='reactflow-wrapper'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onPaneClick={handlePaneClick}
          zoomOnDoubleClick={false}
          onInit={onInstanceLoad}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          >
          <Background />
          <MiniMap></MiniMap>
          <Controls></Controls>
        </ReactFlow>
        <AddNodeModal
          isOpen={showAddNodeModal}
          onClose={() => setShowAddNodeModal(false)}
          onAddNode={handleAddNode}
          setNodeType={setNodeType}
        />

        <EditNodeModal
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          saveChanges={handleSave}
          newLabel={newLabel}
          setNewLabel={setNewLabel}
        />
          
      </div>
    </ReactFlowProvider>
  );
};

export default App;