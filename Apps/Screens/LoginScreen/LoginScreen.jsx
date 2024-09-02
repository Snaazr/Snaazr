import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { supabase } from './../../Utils/SupabaseConfig';

WebBrowser.maybeCompleteAuthSession(); // Finalize any pending authentication session.

const LoginScreen = () => {
  useWarmUpBrowser(); // Prepares the browser for faster OAuth.

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" }); // Initialize Google OAuth flow.

  const onPress = React.useCallback(async () => {
    try {
      // Start OAuth flow and handle the result.
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        // Set the session as active.
        setActive({ session: createdSessionId });

        // If user is signing up for the first time, insert their data into Supabase.
        if (signUp?.emailAddress) {
          const { data, error } = await supabase
            .from('Users')
            .insert([
              {
                name: signUp?.firstName + signUp?.lastName, // Combine first and last name.
                email: signUp?.emailAddress, 
                username: (signUp?.emailAddress).split('@')[0].concat("atSnaZr") // Create a unique username.
              },
            ])
            .select();
          if (data) {
            console.log(data);
          }
        }
      } else {
        // Handle cases like multi-factor authentication (MFA).
      }
    } catch (err) {
      console.error("OAuth error", err); // Log OAuth errors.
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.overlay}>
        {/* App title and subtitle */}
        <Text style={styles.title}>SnaZr</Text>
        <Text style={styles.subtitle}>Shopping with Shorting</Text>

        {/* Google Sign-In button */}
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={require('./../../../assets/Images/Google.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Sign In With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f', // Dark navy color resembling space
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensure background covers the entire screen
    backgroundColor: '#001f3f', // Same color for consistency
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better readability
  },
  title: {
    fontWeight: 'bold',
    color: '#ffffff', // White text
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Dark shadow for better text visibility
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ffffff', // White text
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // White button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: '#000000', // Dark text color for contrast
  },
});

export default LoginScreen;
