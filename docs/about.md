# About Precision JS

## Origin

It all started when I needed to do some math with JavaScript.
As it is all too common, I ran into a problem with decimals.

In JavaScript, math doesn't work as it doesn in real life, as
the following example shows:

```
> 0.1 + 0.2 === 0.3 // false
> 0.1 + 0.3 // 0.30000000000000004
```

That was just the start, however. I needed more features from a
library to be able to make an app that can auto-generate math
problems for my teaching business. None of the libraries out
in the market serve what I need. I need something that can
handle fractions and decimals, and even repeating decimals. In
short, I need a library can do any elementary school-level
math with rational numbers, without losing precision.

If I give a student a problem, say 1/300 + 29/300, the answer
should be 1/10, or 0.1, not 0.09999999999999999. Speaking of,
I needed a library understand that 0.9999... is actually 1.

Since there wasn't any out there, I started PrecisionJS.

## Philosophy

Precision JS largely draws inspiration from doing math by hand.
If we multiply two very large integers, both of which have more
than 200 digits, it'll take us a long time to do it accurately,
but as humans, we can do it. Something like JS console or REPL
can't do that. It'll turn the numbers into scientific notation
and lose all precision. So the goal of this library is to do
math operations without losing precision.
