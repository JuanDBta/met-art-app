import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import Artists from '../components/Artists';

jest.mock('../components/selectedArtists', () => [
  { lastname: 'VanGogh', url: 'https://api.example.com/vangogh' },
  { lastname: 'Renoir', url: 'https://api.example.com/renoir' },
]);

describe('Artists Component', () => {
  const mockStore = configureStore([thunk]);
  const initialState = {
    artists: {
      artists: {
        VanGogh: [1, 2, 3],
        Renoir: [4, 5, 6],
      },
      isLoading: false,
      error: null,
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render Artists component without errors', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <Router>
          <Artists />
        </Router>
      </Provider>,
    );

    const loadingText = queryByText(/Loading/i);
    expect(loadingText).toBeNull();
  });
});
