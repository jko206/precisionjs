const isSciNot = (n: string) => /^\-?\d+(\.\d+)?e(\+|\-)?\d+$/.test(`${n}`)

export default isSciNot
