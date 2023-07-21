import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Paintings from '../components/Paintings';

const initialState = {
  artists: { artists: {} },
  paintings: { data: {}, isLoading: false, error: null },
};

const testReducer = (state = initialState, action) => state;//eslint-disable-line

test('renders the Paintings component without errors', () => {
  const store = createStore(testReducer);

  render(
    <Provider store={store}>
      <Paintings />
    </Provider>,
  );
});
