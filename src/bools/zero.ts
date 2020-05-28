export default (n: number | string) =>
  n === 0 || (/^\-?0*\.?0*$/.test(n as string) && n !== '.' && n !== '-.' && n !== '-')
