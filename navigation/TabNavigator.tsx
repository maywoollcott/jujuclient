import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Entypo,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
  Feather,
} from '@expo/vector-icons';
import { COLORS } from '../globalStyles';
import { HomeNavigator } from './LandingNavigator';
import { ProfileNavigator } from './ProfileNavitor';
import { InboxNavigator } from './InboxNavigator';

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  //add use effect to log out if necessary

  return (
    <Tab.Navigator
      initialRouteName='LandingNav'
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.white,
        tabBarShowLabel: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.white,
          height: Platform.OS === 'ios' ? 50 : 25,
        },
        tabBarStyle: {
          backgroundColor: COLORS.primaryPurple,
          borderTopWidth: 1,
        },
        title: '',
      }}
    >
      <Tab.Screen
        name='HomeNav'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name='home' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='InboxNav'
        component={InboxNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='mail' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileNav'
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person-outline' color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
