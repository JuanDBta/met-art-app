import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MyCollection from '../components/MyCollection';
import '@testing-library/jest-dom/extend-expect';

describe('MyCollection Component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    paintings: {
      data: {
        VanGogh: [
          { objectID: 1, title: 'Starry Night', primaryImage: 'starry-night.jpg', isSelected: true },
        ],
        Monet: [
          { objectID: 2, title: 'Water Lilies', primaryImage: 'water-lilies.jpg', isSelected: true },
        ],
      },
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MyCollection />
      </Provider>
    );
  });

  it('should render MyCollection component without errors', () => {
    const myPaintingsTitle = screen.getByText(/My Paintings/i);
    expect(myPaintingsTitle).toBeInTheDocument();
  });

  it('should render selected paintings', () => {
    const vanGoghPainting = screen.getByText(/Starry Night/i);
    const monetPainting = screen.getByText(/Water Lilies/i);

    expect(vanGoghPainting).toBeInTheDocument();
    expect(monetPainting).toBeInTheDocument();
  });
});
