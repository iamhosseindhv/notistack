module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        corejs: require('core-js/package.json').version,
        useBuiltIns: "usage",
        modules: process.env.ESM === "true" ? false : "commonjs"
      }
    ]    
  ],
  plugins: [
    "babel-plugin-optimize-clsx",
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        version: require("@babel/runtime/package.json").version,
        useESModules: process.env.ESM === "true"
      }
    ]
  ],
  ignore: ["src/index.d.ts"]
};
