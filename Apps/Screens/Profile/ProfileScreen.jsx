import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Expo's image picker library for handling image uploads
import { supabase } from "./../../Utils/SupabaseConfig"; // Supabase client for database interactions

/**
 * ProfileScreen Component
 * Handles user profile display, editing, and logout functionality
 */
const ProfileScreen = () => {
  // State to manage the user's profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  // State to manage user's name (defaulted to 'John Doe')
  const [name, setName] = useState('John Doe');
  // State to manage user's email (defaulted to a mock email)
  const [email, setEmail] = useState('john.doe@example.com');
  // Boolean state to control edit mode for the profile
  const [editMode, setEditMode] = useState(false);

  // Fetch user data from the database on component mount
  useEffect(() => {
    fetchUserData(); // Fetches profile data from Supabase
  }, []);

  /**
   * Fetches the user's data (profile picture, name, and email) from Supabase
   * based on the stored email.
   */
  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('Users')
      .select('profilepic, name, email') // Select relevant fields from the database
      .eq('email', email) // Filters by the email of the logged-in user
      .single(); // Expecting a single result

    if (data) {
      // If user data is found, update the states
      setProfilePicture(data.profilepic);
      setName(data.name);
      setEmail(data.email);
    } else if (error) {
      // Log error if fetching fails
      console.error('Error fetching user data:', error);
    }
  };

  /**
   * Handles image picking using the ImagePicker library.
   * Allows users to choose a new profile picture from their library.
   */
  const handlePickImage = async () => {
    // Launch image picker and allow user to select an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict selection to images
      allowsEditing: true, // Allow user to crop/adjust the image
      aspect: [4, 3], // Set aspect ratio for cropping
      quality: 1, // Set image quality (1 is highest)
    });

    if (!result.canceled) {
      // If user picks an image, update the profilePicture state
      setProfilePicture(result.uri);
      // Future: Consider uploading image to Supabase or other services
    }
  };

  /**
   * Placeholder function for handling user logout.
   * Displays a logout message for now.
   */
  const handleLogout = () => {
    // Future: Implement actual logout logic (e.g., clearing auth tokens)
    alert('Logged out');
  };

  // Default profile picture URL in case the user hasn't uploaded one
  const defaultProfilePicUrl = 'https://example.com/defaultProfilePic.png'; // Replace with actual default image URL

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile picture that can be clicked to change */}
          <TouchableOpacity onPress={handlePickImage}>
            <Image
              source={{ uri: profilePicture || defaultProfilePicUrl }} // Display chosen image or default if none exists
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          {/* Display user's name and email */}
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.email}>{email}</Text>

          {editMode ? (
            // Render editable inputs if in edit mode
            <View style={styles.editSection}>
              {/* Text input to edit name */}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName} // Update name state as user types
              />
              {/* Text input to edit email */}
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail} // Update email state as user types
              />
              {/* Button to save changes and exit edit mode */}
              <Button title="Save" onPress={() => setEditMode(false)} />
            </View>
          ) : (
            // Render Edit Profile button when not in edit mode
            <Button title="Edit Profile" onPress={() => setEditMode(true)} />
          )}
        </View>

        {/* Navigation buttons for various sections */}
        <View style={styles.navigationSection}>
          <Button title="View Products" onPress={() => {/* Navigate to Products Page */}} />
          <Button title="View Cart" onPress={() => {/* Navigate to Cart Page */}} />
          <Button title="View Order History" onPress={() => {/* Navigate to Order History */}} />
        </View>

        {/* Settings section */}
        <View style={styles.settingsSection}>
          <Button title="Account Settings" onPress={() => {/* Navigate to Account Settings */}} />
        </View>

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Stylesheet to handle UI styling
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Safe area container that fills the screen
  },
  container: {
    flex: 1,
    padding: 16, // Adds padding inside the ScrollView
  },
  profileSection: {
    alignItems: 'center', // Centers profile section elements
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular profile picture
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold', // Bold font for username
  },
  email: {
    fontSize: 16,
    color: 'gray', // Gray font color for email
  },
  editSection: {
    marginTop: 16,
    width: '100%', // Full width for edit fields
  },
  input: {
    borderBottomWidth: 1, // Underlined text input
    borderBottomColor: 'gray',
    marginBottom: 8,
    padding: 8,
    fontSize: 16,
  },
  navigationSection: {
    marginBottom: 24, // Adds spacing between sections
  },
  settingsSection: {
    marginBottom: 24, // Adds spacing between sections
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red', // Red background for logout button
    borderRadius: 5, // Rounded button corners
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold', // White bold text for logout
  },
});

export default ProfileScreen; // Exporting the ProfileScreen component
