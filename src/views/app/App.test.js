import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Create Izakaya', () => {
  const { getByText } = render(<App />);
  const createElement = getByText(/Create Izakaya/i);
  expect(createElement).toBeInTheDocument();
});
