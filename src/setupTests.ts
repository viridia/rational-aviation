// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTranslation } from 'react-i18next';

// Mock useTranslation to simply return the translation key.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (s: string) => s,
  }),
}));

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Disable rendering of certain components which have issues running in jsdom
// @ts-ignore
window.Ionic = {
  config: {
    _testing: true,
  },
};
