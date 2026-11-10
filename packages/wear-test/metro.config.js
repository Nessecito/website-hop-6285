const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("path");

const config = getDefaultConfig(__dirname);
const workspaceRoot = resolve(__dirname, "../..");

config.watchFolders = [workspaceRoot];
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [resolve(__dirname, "node_modules"), resolve(workspaceRoot, "node_modules")],
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("@/")) {
    return context.resolveRequest(context, resolve(__dirname, moduleName.slice(2)), platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
