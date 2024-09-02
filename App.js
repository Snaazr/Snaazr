// Import necessary components and libraries
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigation/TabNavigation';
import ThankYouScreen from './Apps/Navigation/ThankYou';


export default function App() {
  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'OutfitBold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            {/* <TabNavigation /> */}
            <ThankYouScreen />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen height
    backgroundColor: '#fff', // White background
  },
});