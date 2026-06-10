import React from 'react';
import { Link } from 'react-router-dom';

const StartGame: React.FC = () => {
    return (
        <main className="mk-empty">
            <div className="mk-panel mk-corners mk-rise">
                <p className="mk-label">Character Creation</p>
                <h1 style={{ margin: '0.6rem 0 1rem', fontSize: '1.6rem' }}>
                    The scribe has not finished this page
                </h1>
                <p style={{ fontStyle: 'italic', color: 'var(--parchment-dim)' }}>
                    Forging your own soul is yet to come. For now, the tale begins
                    with a seasoned wanderer.
                </p>
                <Link to="/story" className="mk-btn mk-btn--primary" style={{ marginTop: '1.2rem' }}>
                    Begin the Tale
                </Link>
            </div>
        </main>
    );
};

export default StartGame;
