export const MAX_ARNUM_DIGIT = (() => {
  const ceil = Number.MAX_SAFE_INTEGER ** 0.5;
  let n = 10;
  while (n * 10 < ceil) n *= 10;
  return n;
})();

export const LOG_10_ARNUM_BASE = Math.log10(MAX_ARNUM_DIGIT)