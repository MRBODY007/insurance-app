module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // allow axios
  ],
};
