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

// WuWaBuilds flow - Frontend converges to Database, then to Deployment/Analytics
function createWuWaBuildsFlow(): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    const nodes: Node<TurboNodeData>[] = [
        // Left side - Frontend stack (more spread out)
        {
            id: 'react-ui',
            position: { x: 0, y: 0 },
            data: { 
                icon: 'react',
                title: 'React', 
                subtitle: 'Real-time Calcs' 
            },
            type: 'turbo',
        },
        {
            id: 'typescript-safety',
            position: { x: 0, y: 140 },
            data: { 
                icon: 'typescript',
                title: 'TypeScript', 
                subtitle: 'Type Safety' 
            },
            type: 'turbo',
        },
        {
            id: 'nextjs-framework',
            position: { x: 0, y: 280 },
            data: { 
                icon: 'nextdotjs',
                title: 'Next.js', 
                subtitle: 'SSR Pages' 
            },
            type: 'turbo',
        },
        // Middle - Data processing
        {
            id: 'mongodb-storage',
            position: { x: 350, y: 140 },
            data: { 
                icon: 'mongodb',
                title: 'MongoDB', 
                subtitle: 'User Builds' 
            },
            type: 'turbo',
        },
        // Right - Deployment & Analytics (more spread out)
        {
            id: 'vercel-deploy',
            position: { x: 700, y: 0 },
            data: { 
                icon: 'vercel',
                title: 'Vercel', 
                subtitle: 'Global CDN' 
            },
            type: 'turbo',
        },
        {
            id: 'analytics-tracking',
            position: { x: 700, y: 140 },
            data: { 
                icon: 'seo',
                title: 'Analytics', 
                subtitle: 'User Tracking' 
            },
            type: 'turbo',
        },
        {
            id: 'cloudflare-cdn',
            position: { x: 700, y: 280 },
            data: { 
                icon: 'cloudflare',
                title: 'Cloudflare', 
                subtitle: 'Edge Cache' 
            },
            type: 'turbo',
        },
    ];

    const edges: Edge[] = [
        { id: 'react-mongo', source: 'react-ui', target: 'mongodb-storage' },
        { id: 'ts-mongo', source: 'typescript-safety', target: 'mongodb-storage' },
        { id: 'next-mongo', source: 'nextjs-framework', target: 'mongodb-storage' },
        { id: 'mongo-vercel', source: 'mongodb-storage', target: 'vercel-deploy' },
        { id: 'mongo-analytics', source: 'mongodb-storage', target: 'analytics-tracking' },
        { id: 'mongo-cloudflare', source: 'mongodb-storage', target: 'cloudflare-cdn' },
    ];

    return { nodes, edges };
}

// Fallback linear flow for other projects (temporary)
function createLinearFlow(techStack: string[]): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    const nodes: Node<TurboNodeData>[] = [];
    const edges: Edge[] = [];
    
    const spacing = 200;
    const yPosition = 100;
    
    techStack.forEach((tech, index) => {
        nodes.push({
            id: `${tech}-${index}`,
            position: { x: index * spacing, y: yPosition },
            data: { 
                icon: tech,
                title: tech,
                subtitle: '', 
            },
            type: 'turbo',
        });
        
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

// Project-specific flow creation
function createProjectFlow(techStack: string[], projectId: string): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    switch (projectId) {
        case 'wuwabuilds':
            return createWuWaBuildsFlow();
        default:
            return createLinearFlow(techStack);
    }
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