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

const KNOWN_EMOTIONS = ['neutral', 'angry', 'happy', 'sad', 'surprised', 'flirty'];

const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text, emotion, onContinue }) => {
    const emotionClass = emotion && KNOWN_EMOTIONS.includes(emotion) ? emotion : 'neutral';

    return (
        <div className={`mk-dialogue emotion-${emotionClass}`}>
            {speaker && (
                <div className="mk-dialogue__speaker">
                    <div className="mk-portrait" aria-hidden="true">
                        {speaker.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="mk-dialogue__name">{speaker.name}</h3>
                        <span className="mk-dialogue__title">{speaker.title}</span>
                    </div>
                </div>
            )}

            <p className="mk-dialogue__text">“{text}”</p>

            <button className="mk-btn" onClick={onContinue}>
                Continue →
            </button>
        </div>
    );
};

export default DialogueBox;
