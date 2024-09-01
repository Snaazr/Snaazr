import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
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
      {/* Background video covering the entire screen */}
      <Video
        style={styles.video}
        source={{
          uri: "https://cdn.pixabay.com/video/2017/11/10/12876-242487530_large.mp4"
        }}
        shouldPlay
        resizeMode='cover'
        isLooping={true} // Loop the video.
      />
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
    flex: 1, // Takes up the full height of the screen.
  },
  video: {
    height: '100%', // Fullscreen video.
    width: '100%',
    position: 'absolute', // Position video behind other content.
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    paddingTop: 60, // Move content down from the top.
    paddingHorizontal: 20,
    backgroundColor: Colors.BACKGROUND_TRANS, // Semi-transparent overlay for better text readability.
  },
  title: {
    fontWeight: "bold",
    color: Colors.WHITE,
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Adds a shadow to the text for better visibility.
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9, // Slightly transparent subtitle.
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 50, // Rounded button corners.
    position: 'absolute', // Positioned near the bottom of the screen.
    bottom: 150,
    shadowColor: '#000', // Adds shadow to the button for depth.
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonImage: {
    width: 30, // Google logo size.
    height: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10, // Space between the Google logo and the text.
  },
});

export default LoginScreen;
