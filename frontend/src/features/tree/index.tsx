// import React, { useEffect, useState } from 'react';
// import ReactFlow, {
// 	addEdge,
// 	Background,
// 	Controls,
// 	Edge,
// 	Node,
// 	OnConnect
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// interface Fish {
//   id: string;
//   weight: number;
//   length: number;
//   height: number;
//   thickness: number;
//   eggs_weight: number;
//   egg_weight: number;
// }

// interface Group {
//   id: string;
//   breed: string;
//   sex: string;
// }

// interface NodeData {
//   fish: Fish;
//   group: Group;
// }

// interface BackendNode {
//   id: number;
//   data: NodeData[];
// }

// interface BackendEdge {
//   id: number;
//   source: number;
//   target: number;
// }

// interface BackendResponse {
//   nodes: BackendNode[];
//   edges: BackendEdge[];
// }

// const fetchTreeData = async (): Promise<BackendResponse> => {
// 	const response = await fetch('/api/tree-data.json');
// 	return response.json();
// };

// const calculateNodePositions = (
// 	nodes: BackendNode[],
// 	edges: BackendEdge[]
// ): Node[] => {
// 	const nodeLevels: Map<number, number> = new Map();
// 	const positions: Node[] = [];
// 	const levelSpacing = 150;
// 	const horizontalSpacing = 200;

// 	const childIds = new Set(edges.map((edge) => edge.target));
// 	const rootNodes = nodes.filter((node) => !childIds.has(node.id));

// 	rootNodes.forEach((node, index) => {
// 		nodeLevels.set(node.id, 0);
// 		positions.push({
// 			id: String(node.id),
// 			data: {
// 				label: `${node.data[0].group.breed} (${node.data[0].group.sex})`,
// 				details: node.data[0]
// 			},
// 			position: { x: index * horizontalSpacing, y: 0 }
// 		});
// 	});

// 	const placeChildren = (parentId: number, level: number, xOffset: number) => {
// 		const children = edges
// 			.filter((edge) => edge.source === parentId)
// 			.map((edge) => edge.target);

// 		let xPosition = xOffset;

// 		children.forEach((childId) => {
// 			const yPosition = (level + 1) * levelSpacing;

// 			nodeLevels.set(childId, level + 1);
// 			const childNode = nodes.find((node) => node.id === childId);
// 			if (childNode) {
// 				positions.push({
// 					id: String(childId),
// 					data: {
// 						label: `${childNode.data[0].group.breed} (${childNode.data[0].group.sex})`,
// 						details: childNode.data[0]
// 					},
// 					position: { x: xPosition, y: yPosition }
// 				});

// 				xPosition += horizontalSpacing;
// 			}

// 			placeChildren(childId, level + 1, xPosition);
// 		});
// 	};

// 	rootNodes.forEach((root) => placeChildren(root.id, 0, 0));

// 	return positions;
// };


// const Tree: React.FC = () => {
// 	const [nodes, setNodes] = useState<Node[]>([]);
// 	const [edges, setEdges] = useState<Edge[]>([]);

// 	useEffect(() => {
// 		const loadTreeData = async () => {
// 			const data = await fetchTreeData();

// 			const formattedNodes = calculateNodePositions(data.nodes, data.edges);

// 			const formattedEdges = data.edges.map((edge) => ({
// 				id: String(edge.id),
// 				source: String(edge.source),
// 				target: String(edge.target)
// 			}));

// 			setNodes(formattedNodes);
// 			setEdges(formattedEdges);
// 		};

// 		loadTreeData();
// 	}, []);

// 	const onConnect: OnConnect = (params) =>
// 		setEdges((eds) => addEdge(params, eds));

// 	return (
// 		<div style={{ height: '100vh', width: '100%' }}>
// 			<ReactFlow
// 				nodes={nodes}
// 				edges={edges}
// 				onConnect={onConnect}
// 				fitView
// 				attributionPosition="top-right"
// 			>
// 				<Background />
// 				<Controls />
// 			</ReactFlow>
// 		</div>
// 	);
// };

// export default Tree;
