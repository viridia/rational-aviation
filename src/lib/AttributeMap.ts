/** AttributeMap is a way to store heterogenously-typed elements into a single map
    in a type-safe way. Each map entry is stored using a key, where the key
    is associated with a specific TypeScript value type.
 */
export type AttributeMap = Record<string, unknown>;

/** A map key with an associated value type. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface AttributeKey<ValueType> {
  key: string;
}

/**
 * Create a typed key. Normally these are created as static constants. It's possible to
 * create keys dynamically, but that's not the primary use case of AttributeMaps.
 * @param key The actual key string.
 * @returns The key object.
 */
export function createKey<ValueType>(key: string): AttributeKey<ValueType> {
  return { key } as AttributeKey<ValueType>;
}

/**
 * Retrieve a typed object from a map using the key.
 * @param map The map containing the value.
 * @param key The key of the item to retrieve.
 * @returns The value associated with that key, or undefined if there is no such entry.
 */
export function getAttribute<Value>(
  map: AttributeMap,
  key: AttributeKey<Value>
): Value | undefined {
  return map[key.key] as Value | undefined;
}

/**
 * Store a typed object in a map using a typed key.
 * @param map The map to store the value to.
 * @param key The key used to store the object.
 * @param value The value to store via the given key.
 */
export function setAttribute<Value>(
  map: AttributeMap,
  key: AttributeKey<Value>,
  value: Value
): void {
  map[key.key] = value;
}
