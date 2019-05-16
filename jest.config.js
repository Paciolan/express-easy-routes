module.exports = {
  coverageDirectory: "reports/coverage",
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).js?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testURL: "http://localhost",
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!**/__tests__/**/*"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
