module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "usage",
        modules: process.env.ESM === "true" ? false : "commonjs"
      }
    ],
    "@babel/preset-react"
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
  env: {
    production: {
      plugins: [
        [
          "babel-plugin-transform-react-remove-prop-types",
          {
            mode: "unsafe-wrap"
          }
        ]
      ]
    }
  }
};
