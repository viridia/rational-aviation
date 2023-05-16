import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import { test, expect } from 'vitest';

afterEach(cleanup);

test('renders without crashing', () => {
  const { baseElement } = render(
    <Provider store={rootStore}>
      <App />
    </Provider>
  );
  expect(baseElement).toBeDefined();
});
