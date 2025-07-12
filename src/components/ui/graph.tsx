"use client";

import React, { useCallback, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, getBezierPath, type Node, type Edge, type OnConnect, type EdgeProps } from '@xyflow/react';
import { TurboNode, type TurboNodeData } from '@/components/ui/turbo-flow';
import '@xyflow/react/dist/base.css';

interface GraphProps {
    techStack: string[];
    projectId: string;
    isReducedMotion?: boolean;
    isMobile?: boolean;
    className?: string;
    isHovered?: boolean;
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
            {/* Particles when highlighted AND not reduced motion */}
            {data?.isHighlighted && !data?.isReducedMotion &&
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

// Project-specific configuration type
type ProjectFlowConfig = {
    nodePositions: Record<string, { mobile: { x: number; y: number }; desktop: { x: number; y: number } }>;
    edges: Array<{ id: string; source: string; target: string }>;
    subtitles?: Record<string, string>; // Optional custom subtitles
    animationPhases?: {
        initialNodes: string[]; // Nodes that spin first (usually input/frontend)
        hubNodes: string[]; // Central nodes that process (usually deployment/processing)
        finalNodes: string[]; // Nodes that spin last (usually output/services)
        initialEdges: string[]; // Edges from initial → hub
        finalEdges: string[]; // Edges from hub → final
    };
}

// Tech name to title mapping (most are just capitalized versions)
function getTechTitle(techName: string): string {
    const titleMap: Record<string, string> = {
        'react': 'React',
        'typescript': 'TypeScript', 
        'nextdotjs': 'Next.js',
        'vercel': 'Vercel',
        'mongodb': 'MongoDB',
        'seo': 'Google Analytics',
        'cloudflare': 'Cloudflare',
        'python': 'Python',
        'fastapi': 'FastAPI',
        'opencv': 'OpenCV',
        'docker': 'Docker',
        'go': 'Go',
        'postgresql': 'PostgreSQL',
        'tailwindcss': 'Tailwind CSS',
        'openai': 'OpenAI',
        'speechapi': 'Web Speech API',
        'rag': 'RAG System',
        'json': 'JSON',
        'deepseek': 'DeepSeek',
        'cerebras': 'Cerebras',
        'chromadb': 'ChromaDB',
        'langchain': 'LangChain',
        // Add more as needed
    };
    
    return titleMap[techName] || techName.charAt(0).toUpperCase() + techName.slice(1);
}

// Project-specific flow configurations
const PROJECT_FLOWS: Record<string, ProjectFlowConfig> = {
    'wuwabuilds': {
        nodePositions: {
            'react': { mobile: { x: 20, y: 20 }, desktop: { x: 160, y: 10 } },
            'typescript': { mobile: { x: 20, y: 70 }, desktop: { x: 160, y: 90 } },
            'nextdotjs': { mobile: { x: 20, y: 120 }, desktop: { x: 160, y: 160 } },
            'vercel': { mobile: { x: 140, y: 70 }, desktop: { x: 370, y: 90 } },
            'mongodb': { mobile: { x: 240, y: 20 }, desktop: { x: 600, y: 10 } },
            'seo': { mobile: { x: 240, y: 70 }, desktop: { x: 600, y: 90 } },
            'cloudflare': { mobile: { x: 240, y: 120 }, desktop: { x: 600, y: 160 } },
        },
        edges: [
            { id: 'react-vercel', source: 'react', target: 'vercel' },
            { id: 'ts-vercel', source: 'typescript', target: 'vercel' },
            { id: 'next-vercel', source: 'nextdotjs', target: 'vercel' },
            { id: 'vercel-mongo', source: 'vercel', target: 'mongodb' },
            { id: 'vercel-analytics', source: 'vercel', target: 'seo' },
            { id: 'vercel-cloudflare', source: 'vercel', target: 'cloudflare' },
        ],
        subtitles: {
            'react': 'UI + Support',
            'typescript': 'Type Safety', 
            'nextdotjs': 'Routing + SSR',
            'vercel': 'Serverless',
            'mongodb': 'Database + API',
            'seo': 'Metrics + SEO',
            'cloudflare': 'DNS + CDN',
        },
        animationPhases: {
            initialNodes: ['react', 'typescript', 'nextdotjs'],
            hubNodes: ['vercel'],
            finalNodes: ['mongodb', 'seo', 'cloudflare'],
            initialEdges: ['react-vercel', 'ts-vercel', 'next-vercel'],
            finalEdges: ['vercel-mongo', 'vercel-analytics', 'vercel-cloudflare'],
        }
    },

    'rag-translation': {
        nodePositions: {
            'deepseek': { mobile: { x: 20, y: 20 }, desktop: { x: 20, y: 10 } },
            'json': { mobile: { x: 20, y: 70 }, desktop: { x: 20, y: 65 } },
            'cerebras': { mobile: { x: 20, y: 120 }, desktop: { x: 20, y: 120 } },
            'chromadb': { mobile: { x: 140, y: 45 }, desktop: { x: 200, y: 35 } },
            'rag': { mobile: { x: 140, y: 95 }, desktop: { x: 200, y: 95 } },
            'langchain': { mobile: { x: 260, y: 70 }, desktop: { x: 380, y: 65 } },
        },
        edges: [
            { id: 'json-chromadb', source: 'json', target: 'chromadb' },
            { id: 'json-rag', source: 'json', target: 'rag' },
            { id: 'deepseek-chromadb', source: 'deepseek', target: 'chromadb' },
            { id: 'cerebras-rag', source: 'cerebras', target: 'rag' },
            { id: 'chromadb-eval', source: 'chromadb', target: 'langchain' },
            { id: 'rag-eval', source: 'rag', target: 'langchain' },
        ],
        subtitles: {
            'deepseek': 'Baseline Translation',
            'json': 'Input Data',
            'cerebras': 'Parallel Extraction',
            'chromadb': 'Vector Storage',
            'rag': 'Enhanced Translation',
            'langchain': 'Evaluation',
        },
        animationPhases: {
            initialNodes: ['deepseek', 'json', 'cerebras'],
            hubNodes: ['chromadb', 'rag'],
            finalNodes: ['langchain'],
            initialEdges: ['json-chromadb', 'json-rag', 'deepseek-chromadb', 'cerebras-rag'],
            finalEdges: ['chromadb-eval', 'rag-eval'],
        }
    },
    
    // Example for other projects
    'cv-api': {
        nodePositions: {
            'fastapi': { mobile: { x: 20, y: 40 }, desktop: { x: 160, y: 90 } },
            'opencv': { mobile: { x: 20, y: 90 }, desktop: { x: 160, y: 140 } },
            'python': { mobile: { x: 140, y: 70 }, desktop: { x: 370, y: 115 } },
            'docker': { mobile: { x: 240, y: 70 }, desktop: { x: 580, y: 115 } },
        },
        edges: [
            { id: 'fastapi-python', source: 'fastapi', target: 'python' },
            { id: 'opencv-python', source: 'opencv', target: 'python' },
            { id: 'python-docker', source: 'python', target: 'docker' },
        ],
        subtitles: {
            'fastapi': 'API Server',
            'opencv': 'Computer Vision',
            'python': 'Processing',
            'docker': 'Containerization',
        },
        animationPhases: {
            initialNodes: ['fastapi', 'opencv'],
            hubNodes: ['python'],
            finalNodes: ['docker'],
            initialEdges: ['fastapi-python', 'opencv-python'],
            finalEdges: ['python-docker'],
        }
    }
};

// Standard animation sequence - same timing for all projects
function createStandardAnimation(
    animationPhases: NonNullable<ProjectFlowConfig['animationPhases']>,
    setSpinningNodes: React.Dispatch<React.SetStateAction<Set<string>>>,
    setHoveredEdges: React.Dispatch<React.SetStateAction<Set<string>>>
): NodeJS.Timeout[] {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Phase 1 (0s): Initial nodes start spinning
    setSpinningNodes(new Set(animationPhases.initialNodes));
    
    // Parallel Events:
    
    // 2.5s: Launch first beams (while initial nodes keep spinning)
    timeouts.push(setTimeout(() => {
        setHoveredEdges(new Set(animationPhases.initialEdges));
    }, 2500));
    
    // 4s: Stop initial nodes + start hub nodes
    timeouts.push(setTimeout(() => {
        setSpinningNodes(prev => {
            const newSet = new Set(prev);
            animationPhases.initialNodes.forEach(node => newSet.delete(node));
            return newSet;
        });
        setSpinningNodes(prev => new Set([...prev, ...animationPhases.hubNodes]));
    }, 4000));
    
    // 6.5s: Launch second beams (while hub nodes keep spinning)
    timeouts.push(setTimeout(() => {
        setHoveredEdges(prev => new Set([...prev, ...animationPhases.finalEdges]));
    }, 6500));
    
    // 8s: Stop hub nodes + start final nodes
    timeouts.push(setTimeout(() => {
        setSpinningNodes(prev => {
            const newSet = new Set(prev);
            animationPhases.hubNodes.forEach(node => newSet.delete(node));
            return newSet;
        });
        setSpinningNodes(prev => new Set([...prev, ...animationPhases.finalNodes]));
    }, 8000));
    
    // 10s: Stop final nodes
    timeouts.push(setTimeout(() => {
        setSpinningNodes(prev => {
            const newSet = new Set(prev);
            animationPhases.finalNodes.forEach(node => newSet.delete(node));
            return newSet;
        });
    }, 10000));
    
    return timeouts;
}

function createProjectFlow(
    techStack: string[], 
    projectId: string, 
    hoveredEdges: Set<string>, 
    spinningNodes: Set<string>, 
    isReducedMotion: boolean = false, 
    isMobile: boolean = false
): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    
    const flowConfig = PROJECT_FLOWS[projectId];
    
    if (!flowConfig) {
        // Fallback to linear flow for undefined projects
        return createLinearFlow(techStack, hoveredEdges, spinningNodes, isReducedMotion, isMobile);
    }
    
    // Create nodes from tech names + project positions
    const nodes: Node<TurboNodeData>[] = Object.entries(flowConfig.nodePositions).map(([techName, positions]) => {
        return {
            id: techName,
            position: isMobile ? positions.mobile : positions.desktop,
            data: {
                icon: techName,
                title: getTechTitle(techName),
                subtitle: flowConfig.subtitles?.[techName] || '',
                selected: spinningNodes.has(techName)
            },
            type: 'turbo',
        };
    });
    
    // Create edges from config
    const edges: Edge[] = flowConfig.edges.map(edgeConfig => ({
        id: edgeConfig.id,
        source: edgeConfig.source,
        target: edgeConfig.target,
        data: {
            isHighlighted: hoveredEdges.has(edgeConfig.id),
            isReducedMotion
        }
    }));
    
    return { nodes, edges };
}

// Fallback linear flow for undefined projects
function createLinearFlow(
    techStack: string[], 
    hoveredEdges: Set<string>, 
    spinningNodes: Set<string>, 
    isReducedMotion: boolean = false, 
    isMobile: boolean = false
): { nodes: Node<TurboNodeData>[], edges: Edge[] } {
    const nodes: Node<TurboNodeData>[] = [];
    const edges: Edge[] = [];
    
    const spacing = isMobile ? 120 : 200;
    const yPosition = isMobile ? 60 : 100;
    
    techStack.forEach((tech, index) => {
        const nodeId = `${tech}-${index}`;
        nodes.push({
            id: nodeId,
            position: { x: index * spacing, y: yPosition },
            data: { 
                icon: tech,
                title: getTechTitle(tech),
                subtitle: '',
                selected: spinningNodes.has(nodeId)
            },
            type: 'turbo',
        });
        
        if (index < techStack.length - 1) {
            const edgeId = `e${index}-${index + 1}`;
            edges.push({
                id: edgeId,
                source: `${tech}-${index}`,
                target: `${techStack[index + 1]}-${index + 1}`,
                data: { 
                    isHighlighted: hoveredEdges.has(edgeId),
                    isReducedMotion
                }
            });
        }
    });
    
    return { nodes, edges };
}

export default function Graph({ techStack, projectId, isReducedMotion = false, isMobile = false, className, isHovered = false }: GraphProps) {
    const [hoveredEdges, setHoveredEdges] = useState<Set<string>>(new Set());
    const [spinningNodes, setSpinningNodes] = useState<Set<string>>(new Set());
    const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

    const { nodes: initialNodes, edges: initialEdges } = createProjectFlow(techStack, projectId, hoveredEdges, spinningNodes, isReducedMotion, isMobile);
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        [setEdges],
    );

    // Handle hover state changes from parent component
    React.useEffect(() => {
        if (isHovered) {
            // Skip all animations in reduced motion mode
            if (isReducedMotion) return;
            
            // Clear any existing timeouts
            timeouts.forEach(timeout => clearTimeout(timeout));
            
            // Use standard animation sequence if project has animation phases
            const flowConfig = PROJECT_FLOWS[projectId];
            if (flowConfig?.animationPhases) {
                const newTimeouts = createStandardAnimation(
                    flowConfig.animationPhases,
                    setSpinningNodes,
                    setHoveredEdges
                );
                setTimeouts(newTimeouts);
            }
        } else {
            // Clear all timeouts
            timeouts.forEach(timeout => clearTimeout(timeout));
            setTimeouts([]);
            
            // Reset all animations
            setSpinningNodes(new Set());
            setHoveredEdges(new Set());
        }
    }, [isHovered, isReducedMotion, projectId]);

    // Update edges when hover state changes
    React.useEffect(() => {
        setEdges((currentEdges) => 
            currentEdges.map(edge => ({
                ...edge,
                data: {
                    ...edge.data,
                    isHighlighted: hoveredEdges.has(edge.id)
                }
            }))
        );
    }, [hoveredEdges, setEdges]);

    // Update nodes when spinning state changes
    React.useEffect(() => {
        setNodes((currentNodes) => 
            currentNodes.map(node => ({
                ...node,
                data: {
                    ...node.data,
                    selected: spinningNodes.has(node.id)
                }
            }))
        );
    }, [spinningNodes, setNodes]);

    if (techStack.length === 0) {
        return null;
    }

    return (
        <div 
            className={`w-full h-full ${isMobile ? 'mobile-graph' : ''} ${className}`}
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