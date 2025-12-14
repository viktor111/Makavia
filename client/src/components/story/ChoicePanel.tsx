/**
 * ChoicePanel Component
 * Displays available story choices with morality indicators.
 */

import React from 'react';
import { StoryChoice } from '../../types/story';

interface ChoicePanelProps {
    prompt?: string;
    choices: StoryChoice[];
    onSelect: (choice: StoryChoice) => void;
}

const getMoralityIndicator = (choice: StoryChoice): { text: string; color: string } | null => {
    if (!choice.effects) return null;

    const moralityEffect = choice.effects.find(e => e.type === 'morality');
    if (!moralityEffect || moralityEffect.type !== 'morality') return null;

    const amount = moralityEffect.amount;
    if (amount >= 15) return { text: '✦ Good', color: '#4caf50' };
    if (amount > 0) return { text: '+ Good', color: '#81c784' };
    if (amount <= -20) return { text: '✦ Evil', color: '#dc143c' };
    if (amount < 0) return { text: '- Evil', color: '#ef5350' };
    return null;
};

const getGoldIndicator = (choice: StoryChoice): number | null => {
    if (!choice.effects) return null;

    const goldEffect = choice.effects.find(e => e.type === 'gold');
    if (!goldEffect || goldEffect.type !== 'gold') return null;

    return goldEffect.amount;
};

const ChoicePanel: React.FC<ChoicePanelProps> = ({ prompt, choices, onSelect }) => {
    return (
        <div
            style={{
                backgroundColor: '#16213e',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
        >
            {prompt && (
                <p
                    style={{
                        color: '#b0b8c8',
                        fontSize: '1rem',
                        fontStyle: 'italic',
                        margin: 0,
                        marginBottom: '0.5rem',
                    }}
                >
                    {prompt}
                </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {choices.map((choice) => {
                    const moralityIndicator = getMoralityIndicator(choice);
                    const goldAmount = getGoldIndicator(choice);

                    return (
                        <button
                            key={choice.id}
                            onClick={() => onSelect(choice)}
                            style={{
                                backgroundColor: '#1f3460',
                                color: '#e0e6ed',
                                border: '2px solid transparent',
                                borderRadius: '8px',
                                padding: '1rem 1.25rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2a4a80';
                                e.currentTarget.style.borderColor = '#4a7ac0';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#1f3460';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <span style={{ fontWeight: '500' }}>{choice.label}</span>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                {moralityIndicator && (
                                    <small style={{ color: moralityIndicator.color, fontWeight: '600' }}>
                                        {moralityIndicator.text}
                                    </small>
                                )}
                                {goldAmount !== null && goldAmount > 0 && (
                                    <small style={{ color: '#ffd700', fontWeight: '600' }}>
                                        +{goldAmount} Gold
                                    </small>
                                )}
                                {goldAmount !== null && goldAmount < 0 && (
                                    <small style={{ color: '#ff6b6b', fontWeight: '600' }}>
                                        {goldAmount} Gold
                                    </small>
                                )}
                            </div>

                            {choice.tooltip && (
                                <small style={{ color: '#6b7894', fontStyle: 'italic' }}>
                                    {choice.tooltip}
                                </small>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ChoicePanel;
