import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Screens/Home/HomeScreen';
import SearchScreen from './../Screens/Search/SearchScreen';
import NotificationScreen from '../Screens/Notifications/NotificationScreen';
import ProfileScreen from './../Screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import CartScreen from '../Screens/Cart/CartScreen';
import Colors from './../Utils/Colors';
import { useUser } from "@clerk/clerk-expo";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { user } = useUser(); // Move the hook inside the functional component

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ profilepic: user.imageUrl })
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .is("profilepic", null)
      .select();
    console.log(data);
  };

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.BLACK,
    }}>
      <Tab.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen 
        name='Search' 
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={32} color="black" />
          ),
        }}
      />
    
      <Tab.Screen 
        name='Notifications' 
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={32} color="black" />
          ),
        }}
      />

      <Tab.Screen 
        name='Cart' 
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen 
        name='Profile' 
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Profile & Settings',
          tabBarIcon: ({ color, size }) => (
            <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 99,
            }}
          />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
