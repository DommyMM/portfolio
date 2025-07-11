"use client";

import React, { useCallback, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, getBezierPath, type Node, type Edge, type OnConnect, type EdgeProps } from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import { TurboNode, type TurboNodeData } from '@/components/ui/TurboFlow';

interface GraphProps {
    techStack: string[];
    projectId: string;
    isReducedMotion?: boolean;
    className?: string;
}

// Custom Animated Edge Component with particles
function AnimatedTurboEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;

    const [edgePath] = getBezierPath({
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const PARTICLE_COUNT = 4;
    const ANIMATE_DURATION = 3;

    return (
        <>
            <path
                id={id}
                style={style}
                className={`react-flow__edge-path ${data?.isHighlighted ? 'edge-highlighted' : 'edge-default'}`}
                d={edgePath}
                markerEnd={markerEnd}
            />
            {/* Particles when highlighted */}
            {data?.isHighlighted &&
                [...Array(PARTICLE_COUNT)].map((_, i) => (
                    <g key={`particle-group-${id}-${i}`}>
                        {/* Outer glow effect */}
                        <ellipse
                            rx="3.5"
                            ry="1.5"
                            fill="url(#particle-glow)"
                            opacity="0.5"
                            filter="url(#particle-blur)"
                        >
                            <animateMotion
                                begin={`${i * (ANIMATE_DURATION / PARTICLE_COUNT)}s`}
                                dur={`${ANIMATE_DURATION}s`}
                                repeatCount="indefinite"
                                rotate="auto"
                                path={edgePath}
                                calcMode="spline"
                                keySplines="0.42, 0, 0.58, 1.0"
                            />
                        </ellipse>
                        {/* Main particle */}
                        <ellipse
                            rx="2.5"
                            ry="1"
                            fill="url(#particle-gradient)"
                            stroke="url(#edge-gradient)"
                            strokeWidth="0.3"
                        >
                            <animateMotion
                                begin={`${i * (ANIMATE_DURATION / PARTICLE_COUNT)}s`}
                                dur={`${ANIMATE_DURATION}s`}
                                repeatCount="indefinite"
                                rotate="auto"
                                path={edgePath}
                                calcMode="spline"
                                keySplines="0.42, 0, 0.58, 1.0"
                            />
                        </ellipse>
                    </g>
                ))}
        </>
    );
}

const nodeTypes = {
    turbo: TurboNode,
};

const edgeTypes = {
    animated: AnimatedTurboEdge,
};

const defaultEdgeOptions = {
    type: 'animated',
    markerEnd: 'edge-circle',
};

// WuWaBuilds flow - Frontend converges to Database, then to Deployment/Analytics
function createWuWaBuildsFlow(hoveredEdgeId: string | null): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    const nodes: Node<TurboNodeData>[] = [
        // Left side - Frontend stack (properly positioned)
        {
            id: 'react-ui',
            position: { x: 160, y: 10 },
            data: { 
                icon: 'react',
                title: 'React', 
                subtitle: 'UI + Support' 
            },
            type: 'turbo',
        },
        {
            id: 'typescript-safety',
            position: { x: 160, y: 90 },
            data: { 
                icon: 'typescript',
                title: 'TypeScript', 
                subtitle: 'Type Safety' 
            },
            type: 'turbo',
        },
        {
            id: 'nextjs-framework',
            position: { x: 160, y: 160 },
            data: { 
                icon: 'nextdotjs',
                title: 'Next.js', 
                subtitle: 'Routing + SSR' 
            },
            type: 'turbo',
        },
        // Middle - Deployment hub
        {
            id: 'vercel-deploy',
            position: { x: 370, y: 90 },
            data: { 
                icon: 'vercel',
                title: 'Vercel', 
                subtitle: 'Serverless' 
            },
            type: 'turbo',
        },
        // Right - Data storage
        {
            id: 'mongodb-storage',
            position: { x: 600, y: 10 },
            data: { 
                icon: 'mongodb',
                title: 'MongoDB', 
                subtitle: 'Database + API' 
            },
            type: 'turbo',
        },
        {
            id: 'analytics-tracking',
            position: { x: 600, y: 90 },
            data: { 
                icon: 'seo',
                title: 'Google Analytics', 
                subtitle: 'Metrics + SEO' 
            },
            type: 'turbo',
        },
        {
            id: 'cloudflare-cdn',
            position: { x: 600, y: 160 },
            data: { 
                icon: 'cloudflare',
                title: 'Cloudflare', 
                subtitle: 'DNS + CDN' 
            },
            type: 'turbo',
        },
    ];

    const edges: Edge[] = [
        { 
            id: 'react-vercel', 
            source: 'react-ui', 
            target: 'vercel-deploy',
            data: { isHighlighted: hoveredEdgeId === 'react-vercel' }
        },
        { 
            id: 'ts-vercel', 
            source: 'typescript-safety', 
            target: 'vercel-deploy',
            data: { isHighlighted: hoveredEdgeId === 'ts-vercel' }
        },
        { 
            id: 'next-vercel', 
            source: 'nextjs-framework', 
            target: 'vercel-deploy',
            data: { isHighlighted: hoveredEdgeId === 'next-vercel' }
        },
        { 
            id: 'vercel-mongo', 
            source: 'vercel-deploy', 
            target: 'mongodb-storage',
            data: { isHighlighted: hoveredEdgeId === 'vercel-mongo' }
        },
        { 
            id: 'vercel-analytics', 
            source: 'vercel-deploy', 
            target: 'analytics-tracking',
            data: { isHighlighted: hoveredEdgeId === 'vercel-analytics' }
        },
        { 
            id: 'vercel-cloudflare', 
            source: 'vercel-deploy', 
            target: 'cloudflare-cdn',
            data: { isHighlighted: hoveredEdgeId === 'vercel-cloudflare' }
        },
    ];

    return { nodes, edges };
}

// Fallback linear flow for other projects (temporary)
function createLinearFlow(techStack: string[], hoveredEdgeId: string | null): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
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
            const edgeId = `e${index}-${index + 1}`;
            edges.push({
                id: edgeId,
                source: `${tech}-${index}`,
                target: `${techStack[index + 1]}-${index + 1}`,
                data: { isHighlighted: hoveredEdgeId === edgeId }
            });
        }
    });
    
    return { nodes, edges };
}

// Project-specific flow creation
function createProjectFlow(techStack: string[], projectId: string, hoveredEdgeId: string | null): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    switch (projectId) {
        case 'wuwabuilds':
            return createWuWaBuildsFlow(hoveredEdgeId);
        default:
            return createLinearFlow(techStack, hoveredEdgeId);
    }
}

export default function Graph({ techStack, projectId, isReducedMotion = false, className }: GraphProps) {
    const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
    const { nodes: initialNodes, edges: initialEdges } = createProjectFlow(techStack, projectId, hoveredEdgeId);
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        [setEdges],
    );

    // Update edges when hover state changes
    React.useEffect(() => {
        const { edges: newEdges } = createProjectFlow(techStack, projectId, hoveredEdgeId);
        setEdges(newEdges);
    }, [hoveredEdgeId, techStack, projectId, setEdges]);

    if (techStack.length === 0) {
        return null;
    }

    return (
        <div 
            className={`w-full h-full ${className}`}
            onMouseEnter={() => setHoveredEdgeId('react-vercel')} // Test with first edge
            onMouseLeave={() => setHoveredEdgeId(null)}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
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

                        {/* Enhanced particle gradients */}
                        <linearGradient id="particle-gradient">
                            <stop offset="0%" stopColor="#d946ef" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>

                        <radialGradient id="particle-glow">
                            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
                            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                        </radialGradient>

                        {/* Blur filter for glow effect */}
                        <filter id="particle-blur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
                        </filter>

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