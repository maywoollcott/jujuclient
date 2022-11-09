import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from '../screens/Home/Home';

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <ProfileStack.Screen name='Profile' component={Profile} />
    </ProfileStack.Navigator>
  );
};
