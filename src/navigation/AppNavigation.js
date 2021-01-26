import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SearchScreen,
  MainScreen,
  ChatScreen,
  ProfileScreen,
} from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Main') {
            iconName = 'add-circle';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles';
          } else {
            iconName = 'person';
          }

          iconName = Platform.OS === 'android' ? 'md-' + iconName : 'ios-' + iconName;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: '',
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: '#ff7',
        activeBackgroundColor: '#ff0',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
