import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "./../../Utils/SupabaseConfig";

const ProfileScreen = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('Users')
      .select('profilepic, name, email')
      .eq('email', email) // Ensure this matches the user's email
      .single();
    
    if (data) {
      setProfilePicture(data.profilepic);
      setName(data.name);
      setEmail(data.email);
    } else if (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
      // Optionally upload the image to Supabase or another service here
    }
  };

  const handleLogout = () => {
    // Logic for logout
    alert('Logged out');
  };

  const defaultProfilePicUrl = 'https://example.com/defaultProfilePic.png'; // Replace with your default image URL

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handlePickImage}>
            <Image
              source={{ uri: profilePicture || defaultProfilePicUrl }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          {editMode ? (
            <View style={styles.editSection}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              <Button title="Save" onPress={() => setEditMode(false)} />
            </View>
          ) : (
            <Button title="Edit Profile" onPress={() => setEditMode(true)} />
          )}
        </View>

        <View style={styles.navigationSection}>
          <Button title="View Products" onPress={() => {/* Navigate to View Products */}} />
          <Button title="View Cart" onPress={() => {/* Navigate to View Cart */}} />
          <Button title="View Order History" onPress={() => {/* Navigate to Order History */}} />
        </View>

        <View style={styles.settingsSection}>
          <Button title="Account Settings" onPress={() => {/* Navigate to Account Settings */}} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  },
  email: {
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

export default ProfileScreen;
