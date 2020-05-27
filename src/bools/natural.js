import isZero from './zero'

export default (n) => !isZero(n) && /^\d+(\.?0*)?$/.test(n)
