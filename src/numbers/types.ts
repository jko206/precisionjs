export type stringOption = {
  form: 'decimal' | 'fraction' | 'mixedNumber' | 'scientific'
  mixedNumber: boolean // only if fraction
  roundMethod: 'round' | 'floor' | 'ceil'
  roundTo: 'repeat' | number // 2 => 10^2 => round to 100th, -2 => 0.01 => round to 0.01th
}
