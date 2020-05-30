import isZero from './zero'

export default (n: string): boolean => !isZero(n) && /^\d+(\.?0*)?$/.test(n)
