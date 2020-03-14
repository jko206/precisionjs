export default n => {
  n = Number(n)
  if(Number.isNaN(n)) throw new Error(`Invalid argument: ${n} is NaN`)
  return n < 0
}