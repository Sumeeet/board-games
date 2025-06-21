export default {
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(test).js"],
  transform: {},
  testEnvironment: "node",
  moduleNameMapper: {
    "^tetris/(.*)$": "<rootDir>/src/tetris/$1",
  },
};
