import React from 'react';
import { render } from '@testing-library/react';
import Minesweeper from './Minesweeper';

// Delete and add your own tests
test('renders the word Minesweeper', () => {
  const { getByText } = render(<Minesweeper />);
  const linkElement = getByText(/Minesweeper/i);
  expect(linkElement).toBeInTheDocument();
});
