const path = require('node:path');

const projectRoot = __dirname;
const isAngularCliJestRun = process.argv.some((argument) => argument.includes('dist/test-out'));

const directJestConfig = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.join(projectRoot, 'setup-jest.ts')],
  transform: {
    '^.+\\.(ts|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: path.join(projectRoot, 'tsconfig.spec.json'),
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  moduleNameMapper: {
    '^@appcore/(.*)$': path.join(projectRoot, 'src/app/app-core/$1'),
    '^@appmodules/(.*)$': path.join(projectRoot, 'src/app/modules/$1'),
    '^@applayout/(.*)$': path.join(projectRoot, 'src/app/layout/$1'),
    '^@appshared/(.*)$': path.join(projectRoot, 'src/app/shared/$1'),
    '^@appconfig/(.*)$': path.join(projectRoot, 'src/app/app-config/$1'),
    '^@appenv/(.*)$': path.join(projectRoot, 'src/environments/$1')
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.array.ts'
  ]
};

module.exports = isAngularCliJestRun ? {} : directJestConfig;
