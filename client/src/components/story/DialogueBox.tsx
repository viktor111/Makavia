/**
 * DialogueBox Component
 * Displays NPC dialogue with speaker name and emotion styling.
 */

import React from 'react';
import { NPC } from '../../types/npc';

interface DialogueBoxProps {
    speaker: NPC | null;
    text: string;
    emotion?: string;
    onContinue: () => void;
}

const getEmotionStyle = (emotion?: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
        borderLeft: '4px solid',
    };

    switch (emotion) {
        case 'angry':
            return { ...baseStyle, borderLeftColor: '#dc143c' };
        case 'happy':
            return { ...baseStyle, borderLeftColor: '#4caf50' };
        case 'sad':
            return { ...baseStyle, borderLeftColor: '#6495ed' };
        case 'surprised':
            return { ...baseStyle, borderLeftColor: '#ffa500' };
        case 'flirty':
            return { ...baseStyle, borderLeftColor: '#ff69b4' };
        default:
            return { ...baseStyle, borderLeftColor: '#888888' };
    }
};

const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text, emotion, onContinue }) => {
    return (
        <div
            style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                ...getEmotionStyle(emotion),
            }}
        >
            {speaker && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#2a2a4e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            color: '#e0e6ed',
                            border: '2px solid #4a4a6e',
                        }}
                    >
                        {speaker.name.charAt(0)}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: '#f0f4f8', fontSize: '1.2rem' }}>
                            {speaker.name}
                        </h3>
                        <small style={{ color: '#8892b0' }}>{speaker.title}</small>
                    </div>
                </div>
            )}

            <p
                style={{
                    color: '#e0e6ed',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    margin: 0,
                    paddingLeft: speaker ? '0' : '0.5rem',
                }}
            >
                "{text}"
            </p>

            <button
                onClick={onContinue}
                style={{
                    alignSelf: 'flex-end',
                    backgroundColor: '#3a3a5e',
                    color: '#e0e6ed',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4a4a7e')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3a3a5e')}
            >
                Continue →
            </button>
        </div>
    );
};

export default DialogueBox;
