import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('Welcome!');

  // Placeholder profile image
  const defaultProfilePicUrl = 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';

  // Dummy profile handler
  const handleProfilePress = () => {
    alert("Login/Sign Up Pressed!");
  };

  // Menu options with icons
  const menuOptions = [
    { id: 1, icon: <MaterialIcons name="star" size={24} color="green" />, label: "Track My Order" },
    { id: 2, icon: <FontAwesome name="question-circle" size={24} color="pink" />, label: "Help Center" },
    { id: 3, icon: <FontAwesome name="comment" size={24} color="skyblue" />, label: "App Feedback" },
    { id: 4, icon: <FontAwesome name="heart" size={24} color="pink" />, label: "Wishlist" }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={{ uri: profilePicture || defaultProfilePicUrl }}
              style={styles.profilePicture}
            />
            <Text style={styles.profileText}>{name}</Text>
            <Text style={styles.loginText}>Login/Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {menuOptions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIcon}>{item.icon}</View>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  profileText: {
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    color: '#777',
    marginTop: 5,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#444',
  },
});

export default SettingsScreen;
