"use client";

import React, { memo } from 'react';
import { Handle, Position, getBezierPath, type Node, type NodeProps, type EdgeProps } from '@xyflow/react';
import { createIconComponent } from '@/lib/icons';

// Node Types
export type TurboNodeData = {
    title: string;
    icon?: string; // icon slug instead of ReactNode
    subtitle?: string;
    selected?: boolean;
};

// TurboNode Component
export const TurboNode = memo(({ data }: NodeProps<Node<TurboNodeData>>) => {
    return (
        <div className={`turbo-node ${data.selected ? 'selected' : ''}`}>
            <div className="turbo-wrapper gradient">
                <div className="turbo-inner">
                    <div className="turbo-body">
                        {data.icon && (
                            <div className="turbo-icon">
                                {createIconComponent(data.icon, { className: "w-3 h-3" })}
                            </div>
                        )}
                        <div>
                            <div className="turbo-title">{data.title}</div>
                            {data.subtitle && <div className="turbo-subtitle">{data.subtitle}</div>}
                        </div>
                    </div>
                    <Handle type="target" position={Position.Left} />
                    <Handle type="source" position={Position.Right} />
                </div>
            </div>
        </div>
    );
});

TurboNode.displayName = "TurboNode";

// TurboEdge Component
export function TurboEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;

    const [edgePath] = getBezierPath({
        // we need this little hack in order to display the gradient for a straight line
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
        />
    );
} 