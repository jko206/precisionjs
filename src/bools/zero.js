export default n => n === 0 || (
    /^\-?0*\.?0*/.test(n) 
    && n !== '.'
    && n !== '-.'
    && n !== '-'
);