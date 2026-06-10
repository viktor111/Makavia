import React from 'react';
import { Link } from 'react-router-dom';

const Root: React.FC = () => {
    return (
        <main className="mk-home">
            <div className="mk-home__halo" aria-hidden="true" />

            <p className="mk-home__eyebrow mk-rise">A tale of shadow and silver</p>

            <h1 className="mk-home__title mk-rise-2">Makavia</h1>

            <div className="mk-rule mk-home__rule mk-rise-3"><span>✦</span></div>

            <p className="mk-home__lede mk-rise-3">
                The strongbox is heavy, the forest is too quiet, and a knight of the
                Silver Order is already on your trail. Every choice cuts — choose
                what you become.
            </p>

            <div className="mk-home__actions mk-rise-4">
                <Link to="/story" className="mk-btn mk-btn--primary">
                    Begin the Tale
                </Link>
                <Link to="/fight" className="mk-btn mk-btn--blood">
                    Enter the Dungeon
                </Link>
            </div>
        </main>
    );
};

export default Root;
