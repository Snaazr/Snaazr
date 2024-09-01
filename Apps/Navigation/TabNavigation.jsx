// Import necessary components and libraries
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Screens/Home/HomeScreen';
import SearchScreen from './../Screens/Search/SearchScreen';
import AddScreen from './../Screens/Add/AddScreen';
import ProfileScreen from './../Screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import CartScreen from '../Screens/Cart/CartScreen';
// import NotificationScreen from '../Screens/Notifications/NotificationScreen';
import Colors from './../Utils/Colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
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
        name='Add' 
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={32} color="black" />
          ),
        }}
      />
      
      {/* Uncomment to include the Notifications tab */}
      {/* <Tab.Screen 
        name='Notifications' 
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={32} color="black" />
          ),
        }}
      /> */}

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
            <Ionicons name="notifications-outline" size={32} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
