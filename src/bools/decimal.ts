export const isTerminatingDec = (n: string): boolean => /^([1-9]\d*|0)?\.\d+$/.test(n)

export const isRepeatingDec = (n: string): boolean => /^(\d+\.)?\d+\.{3}\d+$/.test(n)
