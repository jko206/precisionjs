export default (n: string) => /^\-?\d+(\.\d+)?e(\+|\-)?\d+$/.test(`${n}`)
