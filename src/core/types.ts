export type PrecisionNode = RationalNode | RootNode;

/**
 * Represents: (n / d) * 10^e
 * Example: 2e200 is { type: "rational", n: 2n, d: 1n, e: 200n }
 */
export interface RationalNode {
  type: 'rational';
  n: bigint; // Numerator
  d: bigint; // Denominator
  e: bigint; // Exponent (Base 10) for efficient magnitude storage
}

/**
 * Represents an exact irrational, e.g., sqrt(2)
 */
export interface RootNode {
  type: 'root';
  index: number; // 2 for square root, 3 for cube root
  radical: PrecisionNode; // The inner value
}
