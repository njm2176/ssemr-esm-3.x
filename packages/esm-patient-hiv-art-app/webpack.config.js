const config = require("openmrs/default-webpack-config");
config.scriptRuleConfig.exclude = /node_modules(?![\/\\]@openmrs)/;
config.rules = [
  {
    test: /\.m?js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "swc-loader",
      options: {
        parseMap: true,
      },
    },
  },
];
// this is a CommonJS module
module.exports = config;
