const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("mjs"); // Add support for .mjs files

module.exports = config;
