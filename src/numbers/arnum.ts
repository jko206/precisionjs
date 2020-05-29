interface IArnum {
  digits: number[]
  valueOf: () => number
  toString: () => string
  clone: () => IArnum
}

class Arnum implements IArnum {
  digits: number[]

  constructor(n: number | string | Arnum) {
    n = `${n}`
    this.digits = [123]
  }

  valueOf() {
    return 2
  }

  clone() {
    return new Arnum(this)
  }
}

export default Arnum
