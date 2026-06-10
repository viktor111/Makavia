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
    if (amount >= 15) return { text: '✦ Good', color: 'var(--candle-bright)' };
    if (amount > 0) return { text: '+ Good', color: 'var(--candle)' };
    if (amount <= -20) return { text: '✦ Evil', color: 'var(--blood-bright)' };
    if (amount < 0) return { text: '- Evil', color: 'var(--blood)' };
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
        <div className="mk-panel mk-corners mk-choices">
            {prompt && <p className="mk-choices__prompt">{prompt}</p>}

            {choices.map((choice) => {
                const moralityIndicator = getMoralityIndicator(choice);
                const goldAmount = getGoldIndicator(choice);

                return (
                    <button
                        key={choice.id}
                        className="mk-choice"
                        onClick={() => onSelect(choice)}
                    >
                        <span>{choice.label}</span>

                        {(moralityIndicator || goldAmount !== null) && (
                            <span className="mk-choice__meta">
                                {moralityIndicator && (
                                    <span style={{ color: moralityIndicator.color }}>
                                        {moralityIndicator.text}
                                    </span>
                                )}
                                {goldAmount !== null && goldAmount > 0 && (
                                    <span style={{ color: 'var(--candle-bright)' }}>+{goldAmount} Gold</span>
                                )}
                                {goldAmount !== null && goldAmount < 0 && (
                                    <span style={{ color: 'var(--blood-bright)' }}>{goldAmount} Gold</span>
                                )}
                            </span>
                        )}

                        {choice.tooltip && (
                            <span className="mk-choice__tooltip">{choice.tooltip}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ChoicePanel;
