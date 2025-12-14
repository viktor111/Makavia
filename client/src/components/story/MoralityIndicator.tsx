/**
 * MoralityIndicator Component
 * Visual display of the player's current moral alignment.
 */

import React from 'react';
import { getMoralityTier, getMoralityColor, getMoralityLabel, MORALITY_MIN, MORALITY_MAX } from '../../types/morality';

interface MoralityIndicatorProps {
    score: number;
    showLabel?: boolean;
    compact?: boolean;
}

const MoralityIndicator: React.FC<MoralityIndicatorProps> = ({ score, showLabel = true, compact = false }) => {
    const tier = getMoralityTier(score);
    const color = getMoralityColor(tier);
    const label = getMoralityLabel(tier);

    // Calculate percentage for the bar (0 = leftmost evil, 100 = rightmost good)
    const percentage = ((score - MORALITY_MIN) / (MORALITY_MAX - MORALITY_MIN)) * 100;

    if (compact) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <div
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                    }}
                />
                {showLabel && (
                    <span style={{ color: color, fontWeight: '600', fontSize: '0.9rem' }}>
                        {label}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a2e',
                borderRadius: '8px',
                minWidth: '200px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>Alignment</span>
                <span style={{ color: color, fontWeight: '600' }}>{label}</span>
            </div>

            <div
                style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#2a2a4e',
                    borderRadius: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Gradient background showing evil to good spectrum */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, #8b0000, #dc143c, #888888, #4169e1, #ffd700)',
                        opacity: 0.3,
                    }}
                />

                {/* Current position indicator */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-2px',
                        left: `calc(${percentage}% - 6px)`,
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: '2px solid #fff',
                        boxShadow: `0 0 8px ${color}`,
                        transition: 'left 0.3s ease',
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#666' }}>
                <span>Evil</span>
                <span>{score > 0 ? '+' : ''}{score}</span>
                <span>Good</span>
            </div>
        </div>
    );
};

export default MoralityIndicator;
