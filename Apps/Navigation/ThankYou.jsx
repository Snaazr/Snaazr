import React from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ThankYouScreen = () => {
  const scaleValue = new Animated.Value(0);

  Animated.timing(scaleValue, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true,
  }).start();

  return (
    <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
        <Image
          source={{ uri: 'https://img.icons8.com/clouds/100/000000/checkmark.png' }}
          style={styles.icon}
        />
      </Animated.View>
      <Text style={styles.text}>You're added to our waitlist!</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    backgroundColor: '#ffffff', // White background for the icon container
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 26, // Slightly larger font size
    color: '#ffffff', // White text for contrast
    textAlign: 'center',
    fontWeight: '700', // Bold font for emphasis
    fontFamily: 'sans-serif-light', // Custom font for a modern look
    marginTop: 20,
  },
});

export default ThankYouScreen;
