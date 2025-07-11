"use client";

import React, { useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, type Node, type Edge, type OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import { TurboNode, TurboEdge, type TurboNodeData } from '@/components/ui/TurboFlow';

interface GraphProps {
    techStack: string[];
    projectId: string;
    isReducedMotion?: boolean;
    className?: string;
}

const nodeTypes = {
    turbo: TurboNode,
};

const edgeTypes = {
    turbo: TurboEdge,
};

const defaultEdgeOptions = {
    type: 'turbo',
    markerEnd: 'edge-circle',
};

// Function to organize tech stack into flow based on project
function createProjectFlow(techStack: string[], projectId: string): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    const nodes: Node<TurboNodeData>[] = [];
    const edges: Edge[] = [];
    
    // For now, create a simple linear flow
    // Later we can make this more sophisticated per project
    const spacing = 200;
    const yPosition = 100;
    
    techStack.forEach((tech, index) => {
        nodes.push({
            id: `${tech}-${index}`,
            position: { x: index * spacing, y: yPosition },
            data: { 
                icon: tech,
                title: tech,
                subtitle: '', // Empty for now as requested
            },
            type: 'turbo',
        });
        
        // Create edge to next node
        if (index < techStack.length - 1) {
            edges.push({
                id: `e${index}-${index + 1}`,
                source: `${tech}-${index}`,
                target: `${techStack[index + 1]}-${index + 1}`,
            });
        }
    });
    
    return { nodes, edges };
}

export default function Graph({ techStack, projectId, isReducedMotion = false, className }: GraphProps) {
    const { nodes: initialNodes, edges: initialEdges } = createProjectFlow(techStack, projectId);
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        [setEdges],
    );

    if (techStack.length === 0) {
        return null;
    }

    return (
        <div className={`w-full h-full ${className}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
            >
                <svg>
                    <defs>
                        <linearGradient id="edge-gradient">
                            <stop offset="0%" stopColor="#ae53ba" />
                            <stop offset="100%" stopColor="#2a8af6" />
                        </linearGradient>

                        <marker
                            id="edge-circle"
                            viewBox="-5 -5 10 10"
                            refX="0"
                            refY="0"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
                        </marker>
                    </defs>
                </svg>
            </ReactFlow>
        </div>
    );
}