import './index.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';

interface Fish {
  id: string;
  weight: number;
  length: number;
  height: number;
  thickness: number;
  eggs_weight: number;
  egg_weight: number;
}

interface Group {
  id: string;
  breed: string;
  sex: string;
}

interface NodeData {
  fish: Fish | null;
  group: Group | null;
}

interface BackendNode {
  id: number;
  data: NodeData[];
}

interface BackendEdge {
  id: number;
  source: number;
  target: number;
}

interface BackendResponse {
  nodes: BackendNode[];
  edges: BackendEdge[];
}

const fetchTreeData = async (): Promise<BackendResponse> => {
	const response = await axios.get('http://87.251.79.100:8080/api/v1/generations');
	return response.data;
};

const convertDataForTree = (nodes: BackendNode[], edges: BackendEdge[]) => {
	const nodeMap = new Map<number, any>();
  
	nodes.forEach((node) => {
		nodeMap.set(node.id, {
			name: node.data[0].group
				? `${node.data[0].group.breed} (${node.data[0].group.sex})`
				: node.data[0].fish
					? `Fish: ${node.data[0].fish.id}`
					: 'Child',
			children: [],
			isParent: false
		});
	});

	edges.forEach((edge) => {
		const parentNode = nodeMap.get(edge.source);
		const childNode = nodeMap.get(edge.target);

		if (parentNode && childNode) {
			parentNode.children.push(childNode);
			parentNode.isParent = true;
		}
	});

	const rootNodes = nodes.filter((node) => !edges.some((edge) => edge.target === node.id));
	return rootNodes.map((root) => nodeMap.get(root.id));
};

const TreeComponent: React.FC = () => {
	const [treeData, setTreeData] = useState<any>(null);

	useEffect(() => {
		const loadTreeData = async () => {
			try {
				const data = await fetchTreeData();
				const formattedTreeData = convertDataForTree(data.nodes, data.edges);
				setTreeData(formattedTreeData);
			} catch (error) {
				console.error('Error loading tree data:', error);
			}
		};

		loadTreeData();
	}, []);

	if (!treeData) {
		return <div>Загрузка...</div>;
	}

	return (
		<div style={{ border: '1px solid #ccc', width: '80%', height: '600px' }}>
			<Tree
				data={treeData}
				orientation="vertical"
				nodeSize={{ x: 200, y: 100 }}
				separation={{ siblings: 1, nonSiblings: 2 }}
				pathFunc="step"
				renderCustomNodeElement={({ nodeDatum }) => {
					const nodeColor = nodeDatum.isParent ? '#ff5733' : '#3498db';

					return (
						<g>
							<circle r={30} fill={nodeColor} />
							<text fill="white" fontSize="12" textAnchor="middle" dy={5}>
								{nodeDatum.name}
							</text>
						</g>
					);
				}}
			/>
		</div>
	);
};

export default TreeComponent;
