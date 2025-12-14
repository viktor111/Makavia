/**
 * NarratorBox Component
 * Displays scene narration with mood-based styling.
 */

import React from 'react';

interface NarratorBoxProps {
    text: string;
    mood?: 'neutral' | 'tense' | 'romantic' | 'dark' | 'hopeful';
    onContinue: () => void;
}

const getMoodStyles = (mood?: string): { background: string; borderColor: string } => {
    switch (mood) {
        case 'tense':
            return {
                background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 100%)',
                borderColor: '#6a3093',
            };
        case 'romantic':
            return {
                background: 'linear-gradient(135deg, #1a1a2e 0%, #3d1f2d 100%)',
                borderColor: '#ff69b4',
            };
        case 'dark':
            return {
                background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d0d 100%)',
                borderColor: '#8b0000',
            };
        case 'hopeful':
            return {
                background: 'linear-gradient(135deg, #1a1a2e 0%, #1f3d2d 100%)',
                borderColor: '#4caf50',
            };
        default:
            return {
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                borderColor: '#4a4a6e',
            };
    }
};

const NarratorBox: React.FC<NarratorBoxProps> = ({ text, mood, onContinue }) => {
    const moodStyles = getMoodStyles(mood);

    return (
        <div
            style={{
                background: moodStyles.background,
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                border: `1px solid ${moodStyles.borderColor}`,
            }}
        >
            <p
                style={{
                    color: '#d0d6e6',
                    fontSize: '1.15rem',
                    lineHeight: '1.8',
                    margin: 0,
                    fontStyle: 'italic',
                    textAlign: 'center',
                }}
            >
                {text}
            </p>

            <button
                onClick={onContinue}
                style={{
                    alignSelf: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#e0e6ed',
                    border: `1px solid ${moodStyles.borderColor}`,
                    borderRadius: '8px',
                    padding: '0.75rem 2rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
            >
                Continue →
            </button>
        </div>
    );
};

export default NarratorBox;
