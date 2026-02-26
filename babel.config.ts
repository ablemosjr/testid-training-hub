module.exports = {
  presets: ["next/babel"],
  plugins: [
    ...(process.env.NODE_ENV === "production"
      ? [["react-remove-properties", { properties: ["data-test"] }]]
      : []),
  ],
};