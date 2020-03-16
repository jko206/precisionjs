export const isTerminatingDec = n => /^([1-9]\d*|0)?\.\d+$/.test(n);

export const isRepeatingDec = n => /^(\d+\.)?\d+\.{3}\d+$/.test(n);

