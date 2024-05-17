import React, { useState, useCallback, useRef  } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/style.css';
import EditNodeModal from './EditNodeModal';
import './App.css';

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


const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
];


const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);


  const onConnect = (params: Connection) => {
    setEdges((prevEdges) => addEdge(params, prevEdges));
  };


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

  const onLoad = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);
  }, []);

  const addNode = (x: number, y: number) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: x, y: y },
    };
    setNodes((els) => els.concat(newNode));
  };

  const onDoubleClick = useCallback((event: React.MouseEvent) => {
    console.log('onDoubleClick')
    if (reactFlowWrapper.current && reactFlowInstance) {
      const { top, left } = reactFlowWrapper.current.getBoundingClientRect();

      const x = event.clientX - left;
      const y = event.clientY - top;

      addNode(x, y);
    }
  }, [addNode, reactFlowInstance]);
  return (
    <ReactFlowProvider>
      <div 
        className='reactflow-wrapper' 
        ref={reactFlowWrapper}
        onDoubleClick={onDoubleClick}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          // onPaneClick={onDoubleClick}
          // onPaneClick={(event) => {
          //   addNode(event.pageX, event.pageY);
          // }}
        >
          <Background />
          <MiniMap></MiniMap>
          <Controls></Controls>
        </ReactFlow>

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