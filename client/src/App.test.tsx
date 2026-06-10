import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { GameProvider } from './context/game';

test('renders home navigation link', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <GameProvider>
        <App />
      </GameProvider>
    </MemoryRouter>
  );
  const homeLink = getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
});
