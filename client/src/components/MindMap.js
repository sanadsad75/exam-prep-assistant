import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

function MindMap({ mindMapData }) {
  const convertToFlowNodes = useCallback(() => {
    const nodes = [];
    const edges = [];
    let yOffset = 0;
    let nodeId = 0;

    // Central node
    nodes.push({
      id: 'central',
      type: 'default',
      data: { label: mindMapData.central },
      position: { x: 400, y: 200 },
      style: {
        background: '#0ea5e9',
        color: 'white',
        border: '2px solid #0284c7',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '18px',
        fontWeight: 'bold',
        width: 200,
      },
    });

    // Process branches
    mindMapData.branches.forEach((branch, branchIndex) => {
      const angle = (branchIndex / mindMapData.branches.length) * 2 * Math.PI;
      const radius = 300;
      const branchX = 400 + radius * Math.cos(angle);
      const branchY = 200 + radius * Math.sin(angle);

      // Branch node
      nodes.push({
        id: branch.id || `branch-${branchIndex}`,
        data: { label: branch.name },
        position: { x: branchX, y: branchY },
        style: {
          background: '#38bdf8',
          color: 'white',
          border: '2px solid #0ea5e9',
          borderRadius: '10px',
          padding: '12px',
          fontSize: '14px',
          fontWeight: '600',
          width: 150,
        },
      });

      // Edge from central to branch
      edges.push({
        id: `e-central-${branch.id || branchIndex}`,
        source: 'central',
        target: branch.id || `branch-${branchIndex}`,
        animated: true,
        style: { stroke: '#0ea5e9', strokeWidth: 2 },
      });

      // Process children
      if (branch.children && branch.children.length > 0) {
        branch.children.forEach((child, childIndex) => {
          const childAngle = angle + (childIndex - branch.children.length / 2) * 0.3;
          const childRadius = 150;
          const childX = branchX + childRadius * Math.cos(childAngle);
          const childY = branchY + childRadius * Math.sin(childAngle);

          const childId = child.id || `child-${branchIndex}-${childIndex}`;

          nodes.push({
            id: childId,
            data: { label: child.name },
            position: { x: childX, y: childY },
            style: {
              background: '#bae6fd',
              color: '#075985',
              border: '1px solid #7dd3fc',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '12px',
              width: 120,
            },
          });

          edges.push({
            id: `e-${branch.id || branchIndex}-${childId}`,
            source: branch.id || `branch-${branchIndex}`,
            target: childId,
            style: { stroke: '#7dd3fc', strokeWidth: 1 },
          });
        });
      }
    });

    return { nodes, edges };
  }, [mindMapData]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertToFlowNodes(),
    [convertToFlowNodes]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] bg-white rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default MindMap;
