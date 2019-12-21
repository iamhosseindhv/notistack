module.exports = {
  presets: [
    ["@babel/preset-env", { corejs: 3, useBuiltIns: "usage" }],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
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
