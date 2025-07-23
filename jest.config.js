module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',        // ✅ Adjust folder if needed
    '!src/**/*.d.ts',           
    '!src/**/index.ts',         
    '!src/**/styles.ts',       
  ],
  coverageReporters: ['text', 'lcov'], // 📄 console + HTML
};
