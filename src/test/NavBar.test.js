import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '@testing-library/jest-dom/extend-expect';

test('renders NavBar component without errors', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  const artistsLink = screen.getByText(/Artists/i);
  const myCollectionLink = screen.getByText(/My Collection/i);

  expect(artistsLink).toBeInTheDocument();
  expect(myCollectionLink).toBeInTheDocument();
});
