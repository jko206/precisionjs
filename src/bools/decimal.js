const isRegularDecimal = n => /^([1-9]\d*|0)\.\d+$/.test(n);

const isRepeatingDecimal = n => /^(\d+\.)?\d+\.{3}\d+$/.test(n);

export default n => isRegularDecimal(n) || isRepeatingDecimal(n);
