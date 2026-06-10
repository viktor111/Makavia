import React from 'react';
import { Link } from 'react-router-dom';
import { useGameContext } from '../context/game';
import { PlayerClassEnum } from '../types/classes';
import { PlayerBackgroundEnum } from '../types/playerBackground';
import { WorldTierEnum } from '../types/worldTier';
import { AbilityType } from '../types/abilities';
import { AttributeEnum } from '../types/attributes';
import { Item } from '../types/items';
import { Player } from '../types/player';

const EQUIPMENT_SLOTS: { label: string; itemId: (p: Player) => string }[] = [
    { label: 'Head', itemId: p => p.equippedHead },
    { label: 'Chest', itemId: p => p.equippedChest },
    { label: 'Legs', itemId: p => p.equippedLegs },
    { label: 'Feet', itemId: p => p.equippedFeet },
    { label: 'Main Hand', itemId: p => p.equippedWeapon },
    { label: 'Off Hand', itemId: p => p.equippedOffhand },
    { label: 'Neck', itemId: p => p.equippedNeck },
    { label: 'Ring', itemId: p => p.equippedRing },
];

const ResourceBar: React.FC<{
    label: string;
    current: number;
    max: number;
    variant?: string;
    testId?: string;
}> = ({ label, current, max, variant, testId }) => (
    <div className="mk-stat-row">
        <div className="mk-stat-row__line">
            <span className="mk-label">{label}</span>
            <span className="mk-stat-row__value" data-testid={testId}>
                {Math.round(current)} / {Math.round(max)}
            </span>
        </div>
        <div className="mk-bar">
            <div
                className={variant ? `mk-bar__fill mk-bar__fill--${variant}` : 'mk-bar__fill'}
                style={{ width: `${max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0}%` }}
            />
        </div>
    </div>
);

const Character: React.FC = () => {
    const { player } = useGameContext();

    if (!player) {
        return (
            <main className="mk-empty">
                <div className="mk-panel mk-corners mk-rise">
                    <p className="mk-label">Character</p>
                    <h1 style={{ margin: '0.6rem 0 1rem', fontSize: '1.6rem' }}>No soul is bound to this page</h1>
                    <p style={{ fontStyle: 'italic', color: 'var(--parchment-dim)' }}>
                        Begin the tale, and the ink will find you.
                    </p>
                    <Link to="/story" className="mk-btn mk-btn--primary" style={{ marginTop: '1.2rem' }}>
                        Begin the Tale
                    </Link>
                </div>
            </main>
        );
    }

    const findItem = (id: string): Item | undefined => player.inventory.find(i => i.id === id);
    const attributes = player.getAttributes();

    return (
        <main className="mk-sheet">
            <header className="mk-sheet__head mk-rise">
                <div>
                    <h1 className="mk-sheet__name">{player.name}</h1>
                    <p className="mk-sheet__epithet">
                        Level {player.level} {PlayerBackgroundEnum[player.background]}{' '}
                        {PlayerClassEnum[player.class]} · {WorldTierEnum[player.worldTier]} Tier
                    </p>
                </div>
                <div className="mk-sheet__coins">
                    <span className="mk-chip"><span className="mk-label">Gold</span> {player.gold}</span>
                    <span className="mk-chip"><span className="mk-label">Skill Points</span> {player.skillPoints}</span>
                    <span className="mk-chip"><span className="mk-label">Age</span> {player.age}</span>
                </div>
            </header>

            <div className="mk-rule mk-rise-2"><span>✦</span></div>

            <div className="mk-sheet__grid">
                <section className="mk-panel mk-corners mk-rise-2">
                    <h2>Vitality</h2>
                    <ResourceBar label="Health" current={player.health} max={player.maxHealth} testId="stat-health" />
                    <ResourceBar label="Mana" current={player.mana} max={player.maxMana} variant="mana" />
                    <ResourceBar label="Stamina" current={player.stamina} max={player.maxStamina} variant="stamina" />
                    <ResourceBar label="Piety" current={player.piety} max={player.maxPiety} variant="piety" />
                    <ResourceBar label="Experience" current={player.experience} max={100} variant="xp" />
                    <div className="mk-card__stats" style={{ marginTop: '1rem' }}>
                        <span className="mk-chip"><span className="mk-label">Damage</span> {Math.round(player.damage)}</span>
                        <span className="mk-chip"><span className="mk-label">Armor</span> {Math.round(player.armor)}</span>
                    </div>
                </section>

                <section className="mk-panel mk-corners mk-rise-3">
                    <h2>Attributes</h2>
                    {attributes.map(attr => (
                        <div className="mk-attr" key={attr.attribute} title={attr.description}>
                            <span className="mk-attr__name">{AttributeEnum[attr.attribute]}</span>
                            <span className="mk-attr__value">{Math.round(attr.value)}</span>
                        </div>
                    ))}
                </section>

                <section className="mk-panel mk-corners mk-rise-3">
                    <h2>Equipment</h2>
                    {EQUIPMENT_SLOTS.map(slot => {
                        const item = findItem(slot.itemId(player));
                        return (
                            <div className="mk-equip" key={slot.label}>
                                <span className="mk-label">{slot.label}</span>
                                {item ? (
                                    <span
                                        className={`rarity-${item.rarity.toLowerCase()}`}
                                        title={item.description}
                                    >
                                        {item.name}
                                    </span>
                                ) : (
                                    <span style={{ color: 'var(--parchment-faint)', fontStyle: 'italic' }}>— empty —</span>
                                )}
                            </div>
                        );
                    })}
                </section>

                <section className="mk-panel mk-corners mk-rise-4">
                    <h2>Abilities</h2>
                    {player.learnedAbilities.map(ability => (
                        <div className="mk-ability-row" key={ability.name}>
                            <div className="mk-ability-row__head">
                                <span className="mk-ability-row__name">{ability.name}</span>
                                <span className="mk-label">{AbilityType[ability.type]}</span>
                            </div>
                            <p className="mk-ability-row__desc">{ability.description}</p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default Character;
