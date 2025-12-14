/**
 * CheckpointBox Component
 * Displays chapter completion summary.
 */

import React from 'react';

interface CheckpointBoxProps {
    chapterTitle: string;
    summary: string;
    onContinue?: () => void;
    isGameEnd?: boolean;
}

const CheckpointBox: React.FC<CheckpointBoxProps> = ({
    chapterTitle,
    summary,
    onContinue,
    isGameEnd = false
}) => {
    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                borderRadius: '16px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                border: '1px solid #4a6572',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: isGameEnd
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: `0 0 20px ${isGameEnd ? 'rgba(118, 75, 162, 0.5)' : 'rgba(56, 239, 125, 0.5)'}`,
                }}
            >
                {isGameEnd ? '🏆' : '✓'}
            </div>

            <div>
                <h2 style={{ color: '#f0f4f8', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                    {isGameEnd ? 'Story Complete' : 'Chapter Complete'}
                </h2>
                <h3 style={{ color: '#8892b0', margin: 0, fontWeight: 'normal', fontSize: '1.1rem' }}>
                    {chapterTitle}
                </h3>
            </div>

            <p
                style={{
                    color: '#b0b8c8',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: 0,
                    maxWidth: '500px',
                }}
            >
                {summary}
            </p>

            {onContinue && !isGameEnd && (
                <button
                    onClick={onContinue}
                    style={{
                        backgroundColor: '#11998e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '1rem 2.5rem',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        marginTop: '0.5rem',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#0e8377';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#11998e';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Continue to Next Chapter →
                </button>
            )}

            {isGameEnd && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: '#667eea',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#5a6fd6';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#667eea';
                        }}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckpointBox;
