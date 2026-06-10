/**
 * NarratorBox Component
 * Displays scene narration with mood-based styling — a page of the tome.
 */

import React from 'react';

interface NarratorBoxProps {
    text: string;
    mood?: 'neutral' | 'tense' | 'romantic' | 'dark' | 'hopeful';
    onContinue: () => void;
}

const NarratorBox: React.FC<NarratorBoxProps> = ({ text, mood, onContinue }) => {
    const startsWithLetter = /^[a-zA-Z]/.test(text);

    return (
        <div className={`mk-narration mood-${mood || 'neutral'}`}>
            <p className={startsWithLetter ? 'mk-narration__text mk-narration__text--dropcap' : 'mk-narration__text'}>
                {text}
            </p>

            <button className="mk-btn" onClick={onContinue}>
                Continue →
            </button>
        </div>
    );
};

export default NarratorBox;
