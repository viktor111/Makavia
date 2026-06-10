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
            <div className="mk-morality mk-morality--compact">
                <span
                    className="mk-morality__gem"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
                {showLabel && (
                    <span className="mk-label" style={{ color, letterSpacing: '0.14em' }}>
                        {label}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="mk-morality">
            <div className="mk-morality__head">
                <span className="mk-label">Alignment</span>
                <span className="mk-label" style={{ color, letterSpacing: '0.14em' }}>{label}</span>
            </div>

            <div className="mk-morality__track">
                <div className="mk-morality__spectrum" />
                <div
                    className="mk-morality__needle"
                    style={{
                        left: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                    }}
                />
            </div>

            <div className="mk-morality__ends">
                <span>Evil</span>
                <span style={{ color: 'var(--parchment-dim)' }}>{score > 0 ? '+' : ''}{score}</span>
                <span>Good</span>
            </div>
        </div>
    );
};

export default MoralityIndicator;
