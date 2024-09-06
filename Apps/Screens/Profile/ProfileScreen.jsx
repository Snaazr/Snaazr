/*
 Importing necessary dependencies from React and React Native.
'useEffect' allows running side effects in the functional component.
'useState' manages component state.
Importing UI components such as View, Text, Button, Image, etc. for layout and interaction.
'ImagePicker' from Expo is used to select images from the device gallery.
'supabase' is configured for database operations. 
*/
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "./../../Utils/SupabaseConfig";

// Functional component representing the Settings screen.
const SettingsScreen = () => {
  // State management for profile picture, selected image, user name, status, and edit mode.
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('Yaxh');  // Default user name.
  const [status, setStatus] = useState('Busy');  // Default status message.
  const [editMode, setEditMode] = useState(false);  // Boolean to toggle edit mode for profile information.

/*
  Fetch user data from the Supabase database when the component mounts.
  The 'useEffect' hook ensures this operation happens after the component renders.
*/
  useEffect(() => {
    fetchUserData();
  }, []);

/*  Asynchronous function to fetch user data from the 'Users' table in Supabase.
  Retrieves profile picture, name, and status based on the user's email (mock query as email is missing).
*/
  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('Users')
      .select('profilepic, name, status')
      .eq('email')  // Missing email to fetch data properly.
      .single();

    if (data) {
      // Update the component state with the fetched data.
      setProfilePicture(data.profilepic);
      setName(data.name);
      setStatus(data.status);
    } else if (error) {
      // Log any error during the data fetching process.
      console.error('Error fetching user data:', error);
    }
  };
/*
  Function to handle image selection from the user's device gallery.
  Uses Expo's ImagePicker to select an image, and if successful, updates the 'selectedImage' state.
*/
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  // Allows the user to edit the image after selecting it.
      aspect: [4, 3],  // Aspect ratio for cropping.
      quality: 1,  // Image quality, maxed out at 1.
    });

    // If the image selection was not canceled, update the 'selectedImage' state with the URI of the chosen image.
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);  // Correct handling for newer versions of expo-image-picker.
    }
  };

/* 
Function to handle user logout.
In a real-world scenario, this would trigger proper logout logic (e.g., clearing session, etc.).  
*/
const handleLogout = () => {
    alert('Logged out');
  };

  // Default URL for a profile picture in case the user doesn't have one.
  const defaultProfilePicUrl = 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'; 

  // Rendering the component UI.
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Profile Section: Displays and allows editing the user's profile information */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handlePickImage}>
            {/* Display selected image if available, otherwise use default or fetched profile picture */}
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 130, height: 130, borderRadius: 65 }}
              />
            )}
          </TouchableOpacity>
          {/* Edit mode toggles between viewing and editing the user's profile information */}
          {editMode ? (
            <View style={styles.editSection}>
              {/* Editable fields for name and status */}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                value={status}
                onChangeText={setStatus}
              />
              {/* Save button to exit edit mode */}
              <Button title="Save" onPress={() => setEditMode(false)} />
            </View>
          ) : (
            <>
              {/* Displaying the user's name and status when not in edit mode */}
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.status}>{status}</Text>
              {/* Button to enter edit mode */}
              <Button title="Edit Profile" onPress={() => setEditMode(true)} />
            </>
          )}
        </View>

        {/* Navigation Section: Contains buttons for navigating to other parts of the app */}
        <View style={styles.navigationSection}>
          <Button title="Favorites" onPress={() => {/* Navigate to Favorites */}} />
          <Button title="Wishlist" onPress={() => {/* Navigate to Broadcast Lists */}} />
          <Button title="Order History" onPress={() => {/* Navigate to Starred Messages */}} />
          <Button title="Address" onPress={() => {/* Navigate to Linked Devices */}} />
          <Button title="Saved Card's" onPress={() => {/* Navigate to Linked Devices */}} />
        </View>

        {/* Settings Section: Provides access to various settings */}
        <View style={styles.settingsSection}>
          <Button title="Account" onPress={() => {/* Navigate to Account */}} />
          <Button title="Privacy" onPress={() => {/* Navigate to Privacy */}} />
          <Button title="History" onPress={() => {/* Navigate to Chats */}} />
          <Button title="FAQ" onPress={() => {/* Navigate to Notifications */}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// StyleSheet: Defines the styles for different components and sections of the UI.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 16,
    color: 'gray',
  },
  editSection: {
    marginTop: 16,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 8,
    padding: 8,
    fontSize: 16,
    color: '#000',
  },
  navigationSection: {
    marginBottom: 24,
  },
  settingsSection: {
    marginBottom: 24,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Export the SettingsScreen component as the default export.
export default SettingsScreen;
