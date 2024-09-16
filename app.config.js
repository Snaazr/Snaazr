module.exports = {
  expo: {
    name: "Snaazr",
    slug: "Snaazr",
    version: "1.0.1",
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
    extra: {
      eas: {
        projectId: "39d2df18-1940-42da-bbdb-942073d6e1a1",
      },
    },
  },
};
