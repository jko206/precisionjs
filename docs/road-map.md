# Roadmap

## 1. Core Features & Stability

### Configurable Precision

- [ ] Support configurable default precision (e.g. number of decimal places or significant digits)
      for the entire package.
- [ ] Allow passing precision options directly to individual functions (e.g.
      `add(a, b, { precision: 100 })`).

### Arithmetic Operations

- [x] Addition (`addArnums`)
- [x] Subtraction (`subtractArnums`)
- [x] Multiplication (`multiplyArnums`)
- [ ] Division
  - [ ] Export `divideArnums` in `index.ts`
  - [ ] Verify division precision and rounding modes
- [ ] Exponentiation (`pow`)
- [ ] Irrationals & Constants (`sqrt`, `nthRoot`, `pi`, `e`)
  - [ ] Estimate irrational numbers to a rational number up to the configured precision.
  - [ ] Perform arithmetic after estimating to high-precision rationals.

### Data Structures

- [ ] Stabilize `RationalNumber` class
- [ ] Stabilize `Decimal` class
- [ ] Consistent `Arnum` (Arbitrary Precision Number) usage

### Parser

- [x] Basic Integer parsing
- [x] Decimal parsing
- [x] Scientific Notation parsing
- [x] Numeric Separators support
- [x] Edge cases (`Infinity`, `NaN`, Hex/Bin/Oct)
- [ ] Robust error messages for invalid inputs

## 2. Public API & Exports

- [ ] **Unified Entry Point**: Update `src/index.ts` to export all core functionality.
  - [ ] Export `parse` (parser)
  - [ ] Export `Rational`, `Decimal` classes
  - [ ] Export all arithmetic functions
- [ ] **Fluent Interface** (Optional): Create a wrapper class like `new Precision(x).add(y)` for
      easier chaining.

## 3. Documentation

- [ ] **README**: Add "Getting Started", installation, and basic usage examples.
- [ ] **API Reference**: Generate documentation from JSDoc commentary.
- [ ] **Contributing Guide**: Instructions for setting up dev environment, running tests, and
      linting.

## 4. Testing & Quality Assurance

- [x] Setup `vitest` for unit testing.
- [x] Setup `prettier` for code formatting.
- [x] Setup `eslint` for linting.
- [ ] **Coverage**: Achieve >90% code coverage.
- [ ] **Fuzz Testing**: Property-based testing for arithmetic operations (e.g. `fast-check`).

## 5. Release Engineering

- [ ] **Bundling**: Configure `tsup` or `rollup` to build both CommonJS (`cjs`) and ES Modules
      (`esm`) formats.
- [ ] **CI/CD**: Setup GitHub Actions for:
  - [ ] Automated testing on PRs
  - [ ] Automated linting/type-checking
  - [ ] Publishing to npm on release tags
- [ ] **Semantic Versioning**: Establish commit message convention (e.g. Conventional Commits) for
      automated versioning.

## 6. Dev Experience & Modernization

- [ ] **Refactoring**:
  - [ ] Convert `RationalNumber` and other classes to functional style (simpler, tree-shakeable
        inputs/outputs).
  - [ ] Standardize file naming conventions (kebab-case vs camelCase).
  - [ ] Organize `src/definitions`: Consider grouping by domain or flattening if too nested.
  - [ ] Remove `src/static` and `src/util` by moving types/helpers closer to usage or into a
        dedicated `types` or `utils` package if shared.
  - [ ] Strict TypeScript: Enable `noImplicitAny` and `strictNullChecks` in `tsconfig` and fix all
        resulting errors. (Partially done).
- [ ] **Tooling**:
  - [ ] Add `husky` for pre-commit hooks (linting, testing).
  - [ ] Add `lint-staged` to run checks only on changed files.
  - [ ] Update `eslint` config to latest recommended TypeScript rules.

## 7. Future / Vision (v2+)

- [ ] **Symbolic Reasoning**: Support storing numbers symbolically (e.g., preserving `1 + sqrt(2)`
      as an expression instead of estimating to a rational number) to enable mathematically perfect,
      zero-loss operations. Defer until there is sufficient community demand.
