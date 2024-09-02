module.exports = {
    expo: {
      name: "Snaazr",
      slug: "Snaazr",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/snaazr.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.snaazr.app",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        package: "com.snaazr.app",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      plugins: ["expo-font"],
    },
  };
  