import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { GameProvider } from './context/game';
import { Enemy, EnemyGenerator } from './types/enemies';
import { Slash } from './types/abilities';
import { ItemGenerator } from './types/items';
import { WorldTierEnum } from './types/worldTier';

const makeEnemy = (health: number, damage: number): Enemy => {
    const item = new ItemGenerator().generateItem(WorldTierEnum.Base);
    return new Enemy('test-enemy', 'Training Dummy', health, damage, [new Slash()], '', false, 0, [item], 2);
};

const mockEnemyGeneration = (health: number, damage: number) => {
    jest.spyOn(EnemyGenerator.prototype, 'generateEnemies')
        .mockImplementation(() => [makeEnemy(health, damage)]);
};

const renderGame = () =>
    render(
        <React.StrictMode>
            <MemoryRouter initialEntries={['/story']}>
                <GameProvider>
                    <App />
                </GameProvider>
            </MemoryRouter>
        </React.StrictMode>
    );

/**
 * Click through the story: for each stop, click "Continue →" until a button
 * matching the stop appears, then click it. Throws if the route dead-ends.
 */
const walkTo = (stops: RegExp[]) => {
    for (const stop of stops) {
        let guard = 0;
        for (;;) {
            if (++guard > 80) throw new Error(`never reached ${stop}`);
            const target = screen.queryByRole('button', { name: stop });
            if (target) {
                fireEvent.click(target);
                break;
            }
            const cont = screen.queryByRole('button', { name: /continue/i });
            if (!cont) throw new Error(`stuck before ${stop} — no continue button on screen`);
            fireEvent.click(cont);
        }
    }
};

// The deterministic test route through Chapter 1 to the demon fight.
const walkToChapter1Combat = async () => {
    await screen.findByRole('button', { name: /continue/i }); // initial mount settled
    walkTo([
        /the truth, more or less/i,        // gate
        /walk in together/i,               // the Copper Hen
        /let serenya answer/i,             // Hobb confrontation
        /until she sleeps again/i,         // the dream
        /people are vanishing/i,           // the contract
        /born to this/i,                   // the gown
        /askariyan accent/i,               // Fenwick
        /i'm working/i,                    // Marcelline's opening game
        /let her look/i,                   // Isadora and the crest
        /another night, my lady/i,         // decline her invitation, gracefully
        /draw nightfang/i,                 // face the demon
        /begin battle/i,
    ]);
};

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

test('winning the chapter 1 battle advances the story to the win node', async () => {
    mockEnemyGeneration(1, 0); // dies to a single Slash
    renderGame();
    await walkToChapter1Combat();

    fireEvent.click(await screen.findByRole('button', { name: 'Slash' }));
    expect(await screen.findByRole('heading', { name: /victory/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /return to story/i }));

    // c1_demon_slain, not the chapter intro
    expect(await screen.findByText(/the way highborn demons die/i)).toBeInTheDocument();
    expect(screen.queryByText(/valkenshire rises out of the dusk/i)).toBeNull();
});

test('losing the chapter 1 battle advances the story to the lose node and revives the player', async () => {
    jest.useFakeTimers();
    mockEnemyGeneration(1000000, 1000000); // unkillable, one-shots the player
    renderGame();
    await walkToChapter1Combat();

    fireEvent.click(await screen.findByRole('button', { name: 'Slash' }));
    act(() => {
        jest.advanceTimersByTime(800); // demon takes its turn
    });
    expect(await screen.findByRole('heading', { name: /defeat/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /return to story/i }));

    // c1_demon_lose, not the chapter intro
    expect(await screen.findByText(/four centuries of hunger/i)).toBeInTheDocument();
    expect(screen.queryByText(/valkenshire rises out of the dusk/i)).toBeNull();

    // the player was revived so the story can continue
    fireEvent.click(screen.getByRole('link', { name: /character/i }));
    expect(await screen.findByTestId('stat-health')).toHaveTextContent('100 / 100');
});

test('after a story battle the dungeon fights a fresh enemy, not the story one', async () => {
    mockEnemyGeneration(1, 0);
    renderGame();
    await walkToChapter1Combat();

    fireEvent.click(await screen.findByRole('button', { name: 'Slash' }));
    fireEvent.click(await screen.findByRole('button', { name: /return to story/i }));
    expect(await screen.findByText(/the way highborn demons die/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /dungeon/i }));
    expect(await screen.findByRole('heading', { name: /vs Training Dummy/i })).toBeInTheDocument();
    expect(screen.queryByText(/Nek'thurien/)).toBeNull();
});

test('a story battle abandoned via the nav bar can be retried and does not leak the story enemy into the dungeon', async () => {
    mockEnemyGeneration(1000000, 0); // survives, deals no damage
    renderGame();
    await walkToChapter1Combat();

    // hit it once, then walk out mid-battle through the nav bar
    fireEvent.click(await screen.findByRole('button', { name: 'Slash' }));
    fireEvent.click(screen.getByRole('link', { name: /story mode/i }));

    // back at the combat node ready to retry — not reset to the intro
    expect(await screen.findByRole('button', { name: /begin battle/i })).toBeInTheDocument();
    expect(screen.queryByText(/valkenshire rises out of the dusk/i)).toBeNull();

    // the dungeon generates a fresh enemy instead of reusing the story one
    fireEvent.click(screen.getByRole('link', { name: /dungeon/i }));
    expect(await screen.findByRole('heading', { name: /vs Training Dummy/i })).toBeInTheDocument();
    expect(screen.queryByText(/Nek'thurien/)).toBeNull();
});

test('leaving the story and returning resumes at the current node', async () => {
    mockEnemyGeneration(1, 0);
    renderGame();

    fireEvent.click(await screen.findByRole('button', { name: /continue/i })); // -> c1_gates
    expect(await screen.findByText(/ebony armor wreathed/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /character/i }));
    fireEvent.click(screen.getByRole('link', { name: /story mode/i }));

    expect(await screen.findByText(/ebony armor wreathed/i)).toBeInTheDocument();
    expect(screen.queryByText(/valkenshire rises out of the dusk/i)).toBeNull();
});
