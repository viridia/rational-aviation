class InvariantError extends Error {
  constructor(message?: string) {
    super(message || 'Invariant Error');
  }
}

/** Asserts that the given condition is true, or throws an exception. Return type narrows
 *  the type of the condition to be truthy.
 *  @param condition The condition we are testing.
 *  @param message Optional message or message function.
 *  @throws {InvariantError} if the condition is falsey.
 */
export function invariant(
  condition: unknown,
  message?: string | (() => string)
): asserts condition {
  if (!condition) {
    throw new InvariantError(typeof message === 'function' ? message() : message);
  }
}
