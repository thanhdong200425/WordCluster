const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// expo-router's prebuilt files statically import "react-native/jsx-dev-runtime"
// and "react-native/jsx-runtime", which don't exist in react-native.
// Previously NativeWind's Metro plugin handled this remapping; now we do it manually.
const originalResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native/jsx-dev-runtime") {
    return {
      filePath: path.resolve(__dirname, "node_modules/react/jsx-dev-runtime.js"),
      type: "sourceFile",
    };
  }
  if (moduleName === "react-native/jsx-runtime") {
    return {
      filePath: path.resolve(__dirname, "node_modules/react/jsx-runtime.js"),
      type: "sourceFile",
    };
  }
  if (originalResolver) {
    return originalResolver(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
});
