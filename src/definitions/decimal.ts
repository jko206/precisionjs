export const isTerminatingDec = (n: string): boolean => /^([1-9]\d*|0)?\.\d+$/.test(n)

export const isRepeatingDec = (n: string): boolean => /^[+-]?(?:\d*\.\d*|\d+)\(\d+\)$/.test(n) && n !== `(${n.match(/\((.*)\)/)?.[1]})`
