import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home navigation link', () => {
  const { getByRole } = render(<App />);
  const homeLink = getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
});
