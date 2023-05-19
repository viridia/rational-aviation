import { describe, it, expect } from 'vitest';
import { invariant } from './invariant';

describe('variant', () => {
  it('should do nothing if condition is truthy', () => {
    expect(() => invariant(true)).not.toThrow();
    expect(() => invariant(1)).not.toThrow();
    expect(() => invariant('good stuff')).not.toThrow();
  });

  it('should throw if condition is falsey', () => {
    expect(() => invariant(false)).toThrow();
    expect(() => invariant(0)).toThrow();
    expect(() => invariant('')).toThrow();
  });

  it('should throw with error message is falsey', () => {
    expect(() => invariant(false, 'expected truth')).toThrow(/expected truth/);
    expect(() => invariant(false, () => 'expected truth')).toThrow(/expected truth/);
  });

  it('should narrow the argument type', () => {
    const s: string | null = 'test';
    invariant(s);
    expect(s.length).toBeGreaterThan(0); // No nullable warning from TypeScript
  });
});
