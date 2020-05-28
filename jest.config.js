module.exports = {
  transform: {
    '.(js|ts|tsx|jsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testRegex: '.*.test.(js|tsx|ts)$',
  moduleDirectories: ['./node_modules'],
  runner: 'jest-serial-runner',
  verbose: true,
}
