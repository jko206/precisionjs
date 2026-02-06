# About Precision JS

## Origin

It all started when I needed to do some math with JavaScript. As is all too common, I ran into a
problem with decimals.

In JavaScript, math doesn't work as it does in real life, as the following example shows:

```
> 0.1 + 0.2 === 0.3 // false
> 0.1 + 0.3 // 0.30000000000000004
```

That was just the start, however. I needed more features from a library to be able to build an app
that can auto-generate math problems for my teaching business. None of the libraries on the market
served my needs. I needed something that could handle fractions and decimals, and even repeating
decimals. In short, I needed a library that could do any elementary school-level math with rational
numbers, without losing precision.

If I give a student a problem, say 1/300 + 29/300, the answer should be 1/10, or 0.1, not
0.09999999999999999. Speaking of which, I needed a library that understands that 0.999... is
actually 1.

Since there wasn't anything suitable out there, I started PrecisionJS.

## Philosophy

Precision JS largely draws inspiration from doing math by hand. If we multiply two very large
integers, both of which have more than 200 digits, it'll take us a long time to do it accurately,
but as humans, we can do it. Something like the JS console or REPL can't do that. It'll turn the
numbers into scientific notation and lose precision. The goal of this library is to perform math
operations without losing any precision.
