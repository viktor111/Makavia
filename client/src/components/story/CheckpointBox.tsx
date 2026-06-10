/**
 * CheckpointBox Component
 * Displays chapter completion summary — the seal at a chapter's end.
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
        <div className="mk-panel mk-corners mk-checkpoint">
            <div className="mk-seal" aria-hidden="true">
                {isGameEnd ? '✦' : '✓'}
            </div>

            <div>
                <p className="mk-label mk-checkpoint__kicker">
                    {isGameEnd ? 'Story Complete' : 'Chapter Complete'}
                </p>
                <h2 className="mk-checkpoint__title">{chapterTitle}</h2>
            </div>

            <div className="mk-rule" style={{ width: 'min(320px, 60vw)' }}><span>✦</span></div>

            <p className="mk-checkpoint__summary">{summary}</p>

            {onContinue && !isGameEnd && (
                <button className="mk-btn mk-btn--primary" onClick={onContinue}>
                    Continue to Next Chapter →
                </button>
            )}

            {isGameEnd && (
                <button className="mk-btn" onClick={() => window.location.reload()}>
                    Play Again
                </button>
            )}
        </div>
    );
};

export default CheckpointBox;
