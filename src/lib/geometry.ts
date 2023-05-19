// Copyright © 2023 Arciem LLC. All rights reserved.
// This code is proprietary and confidential.
// Contributions to this file are considered "work made for hire" under applicable law.

export type AppPoint = [number, number]; // x, y
export type AppSize = [number, number]; // width, height
export type AppRect = [number, number, number, number]; // x, y, width, height
export type AppRange = [number, number]; // a, b

export const infiniteRect: AppRect = [-Infinity, -Infinity, Infinity, Infinity];

/**
 * Returns true if the two points are equal.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns True if the two points are equal.
 */
export function pointsAreEqual(a: AppPoint, b: AppPoint): boolean {
  return a === b || (a[0] === b[0] && a[1] === b[1]);
}

/**
 * Returns true if the two point arrays are equal.
 * @param a The first point array.
 * @param b The second point array.
 * @returns True if the two point arrays are equal.
 */
export function pointArraysAreEqual(a: AppPoint[], b: AppPoint[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((aPoint, i) => pointsAreEqual(aPoint, b[i]));
}

/**
 * Returns true if the two sizes are equal.
 * @param a The first size.
 * @param b The second size.
 * @returns True if the two sizes are equal.
 */
export function sizesAreEqual(a: AppSize, b: AppSize): boolean {
  if (a === b) return true;
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns true if the two rectangles are equal.
 * @param a The first rectangle.
 * @param b The second rectangle.
 * @returns True if the two rectangles are equal.
 */
export function rectsAreEqual(a: AppRect, b: AppRect): boolean {
  if (a === b) return true;
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns true if the two ranges are equal.
 * @param a The first range.
 * @param b The second range.
 * @returns True if the two ranges are equal.
 */
export function rangesAreEqual(a: AppRange, b: AppRange): boolean {
  if (a === b) return true;
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns the union of two rectangles.
 *
 * If `a` is null, returns `b`.
 *
 * @param a The first rectangle, or null.
 * @param b The second rectangle.
 * @returns The union of the two rectangles.
 */
export function unionRects(a: AppRect | null, b: AppRect): AppRect {
  if (a === null) {
    return b;
  }
  return [
    Math.min(a[0], b[0]),
    Math.min(a[1], b[1]),
    Math.max(a[0] + a[2], b[0] + b[2]) - Math.min(a[0], b[0]),
    Math.max(a[1] + a[3], b[1] + b[3]) - Math.min(a[1], b[1]),
  ];
}

/**
 * Returns whether a point is in a rectangle.
 *
 * @param point The point.
 * @param rect The rectangle.
 * @returns Whether the point is in the rectangle.
 */
export function isPointInRect(point: AppPoint, rect: AppRect): boolean {
  return (
    point[0] >= rect[0] &&
    point[0] <= rect[0] + rect[2] &&
    point[1] >= rect[1] &&
    point[1] <= rect[1] + rect[3]
  );
}

/**
 * Returns the center of a rectangle.
 *
 * @param rect The rectangle.
 * @returns The center of the rectangle.
 */
export function rectCenter(rect: AppRect): AppPoint {
  return [rect[0] + rect[2] / 2, rect[1] + rect[3] / 2];
}

/**
 * Returns a rectangle with the given center and size.
 *
 * @param center The center of the rectangle.
 * @param size The size of the rectangle.
 * @returns The rectangle.
 */
export function rectFromCenterAndSize(center: AppPoint, size: AppSize): AppRect {
  return [center[0] - size[0] / 2, center[1] - size[1] / 2, size[0], size[1]];
}

/**
 * Validates a point.
 *
 * A point is an array of two finite numbers.
 *
 * @param point The point.
 * @throws If the point is invalid.
 */
export function validatePoint(point: AppPoint) {
  if (!Array.isArray(point) || point.length !== 2 || !isFinite(point[0]) || !isFinite(point[1])) {
    throw new Error(`Invalid point: ${point}`);
  }
}

/**
 * Validates an optional point.
 *
 * An optional point is either undefined or a point.
 *
 * @param point The point, or undefined.
 * @throws If the point is invalid.
 */
export function validateOptionalPoint(point: AppPoint | undefined) {
  if (point === undefined) {
    return;
  }
  validatePoint(point);
}

/**
 * Validates a size.
 *
 * A size is an array of two finite numbers.
 *
 * @param size The size.
 * @throws If the size is invalid.
 */
export function validateSize(size: AppSize) {
  if (!Array.isArray(size) || size.length !== 2 || !isFinite(size[0]) || !isFinite(size[1])) {
    throw new Error(`Invalid size: ${size}`);
  }
}

/**
 * Validates an optional size.
 *
 * An optional size is either undefined or a size.
 *
 * @param size The size, or undefined.
 * @throws If the size is invalid.
 */
export function validateOptionalSize(size: AppSize | undefined) {
  if (size === undefined) {
    return;
  }
  validateSize(size);
}

/**
 * Performs a linear interpolation in the range.
 *
 * If `t` is outside the range [0, 1], the result is extrapolated.
 *
 * @param t The interpolation parameter.
 * @param a The first number.
 * @param b The second number.
 * @returns The interpolated number.
 */
export function lerp(t: number, range: [number, number]): number {
  return range[0] + (range[1] - range[0]) * t;
}

/**
 * Returns a function that performs a linear interpolation in the range.
 *
 * If `t` is outside the range [0, 1], the result is extrapolated.
 *
 * @param a The first number.
 * @param b The second number.
 * @returns The interpolation function.
 */
export function interp(a: number, b: number): (t: number) => number {
  if (a === b) {
    return () => a;
  } else {
    return (t: number) => lerp(t, [a, b]);
  }
}

/**
 * Map the value x from the first range into the second.
 *
 * @param x The value to map.
 * @param from The first range.
 * @param to The second range.
 * @returns The mapped value.
 */
export function lerpMap(x: number, from: AppRange, to: AppRange): number {
  return lerp((x - from[0]) / (from[1] - from[0]), to);
}

/**
 * Returns a function that maps the value x from the first range into the second.
 *
 * @param from The first range.
 * @param to The second range.
 * @returns The mapping function.
 */
export function interpMap(from: AppRange, to: AppRange): (x: number) => number {
  if (rangesAreEqual(from, to)) {
    return (x: number) => x;
  } else {
    return (x: number) => lerpMap(x, from, to);
  }
}

/**
 * Clamps a value to a range.
 *
 * @param value The value.
 * @param range The range.
 * @returns The clamped value.
 */
export function clamp(value: number, range: AppRange): number {
  return Math.min(Math.max(value, range[0]), range[1]);
}

/**
 * Interpolates between two points.
 *
 * @param t The interpolation parameter.
 * @param a The first point.
 * @param b The second point.
 * @returns The interpolated point.
 */
export function lerpPoint(t: number, a: AppPoint, b: AppPoint): AppPoint {
  return [lerp(t, [a[0], b[0]]), lerp(t, [a[1], b[1]])];
}

/**
 * Returns a function that interpolates between two points.
 *
 * @param a The first point.
 * @param b The second point.
 * @returns The interpolation function.
 */
export function interpPoint(a: AppPoint, b: AppPoint): (t: number) => AppPoint {
  if (pointsAreEqual(a, b)) {
    return () => a;
  } else {
    return (t: number) => lerpPoint(t, a, b);
  }
}

/**
 * Interpolates between two sizes.
 *
 * @param t The interpolation parameter.
 * @param a The first size.
 * @param b The second size.
 * @returns The interpolated size.
 */
export function lerpSize(t: number, a: AppSize, b: AppSize): AppSize {
  return [lerp(t, [a[0], b[0]]), lerp(t, [a[1], b[1]])];
}

/**
 * Returns a function that interpolates between two sizes.
 *
 * @param a The first size.
 * @param b The second size.
 * @returns The interpolation function.
 */
export function interpSize(a: AppSize, b: AppSize): (t: number) => AppSize {
  if (sizesAreEqual(a, b)) {
    return () => a;
  } else {
    return (t: number) => lerpSize(t, a, b);
  }
}

/**
 * Interpolates between two rectangles.
 *
 * @param t The interpolation parameter.
 * @param a The first rectangle.
 * @param b The second rectangle.
 * @returns The interpolated rectangle.
 */
export function lerpRect(t: number, a: AppRect, b: AppRect): AppRect {
  return [
    lerp(t, [a[0], b[0]]),
    lerp(t, [a[1], b[1]]),
    lerp(t, [a[2], b[2]]),
    lerp(t, [a[3], b[3]]),
  ];
}

/**
 * Returns a function that interpolates between two rectangles.
 *
 * @param a The first rectangle.
 * @param b The second rectangle.
 * @returns The interpolation function.
 */
export function interpRect(a: AppRect, b: AppRect): (t: number) => AppRect {
  if (rectsAreEqual(a, b)) {
    return () => a;
  } else {
    return (t: number) => lerpRect(t, a, b);
  }
}

/**
 * Interpolates between two arrays of points.
 *
 * @param t The interpolation parameter.
 * @param a The first array of points.
 * @param b The second array of points.
 * @returns The interpolated array of points.
 * @throws If the arrays have different lengths.
 */
export function lerpPoints(t: number, a: AppPoint[], b: AppPoint[]): AppPoint[] {
  if (a.length !== b.length) {
    throw new Error(
      `Cannot interpolate between arrays of different lengths: ${a.length} and ${b.length}`
    );
  }
  const result: AppPoint[] = [];
  for (let i = 0; i < a.length; i++) {
    result.push(lerpPoint(t, a[i], b[i]));
  }
  return result;
}

/**
 * Returns a function that interpolates between two arrays of points.
 *
 * @param a The first array of points.
 * @param b The second array of points.
 * @returns The interpolation function.
 * @throws If the arrays have different lengths.
 */
export function interpPoints(a: AppPoint[], b: AppPoint[]): (t: number) => AppPoint[] {
  if (pointArraysAreEqual(a, b)) {
    return () => a;
  } else {
    return (t: number) => lerpPoints(t, a, b);
  }
}

/**
 * Returns the size resulting from adding two points or sizes.
 *
 * @param a The first point or size.
 * @param b The second point or size.
 * @returns The resulting size.
 */
export function addSize(a: AppSize | AppPoint, b: AppSize | AppPoint): AppSize {
  return [a[0] + b[0], a[1] + b[1]];
}
