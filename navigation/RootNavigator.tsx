import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/Landing/Landing';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';
import Home from '../screens/Home/Home';
import { TabNavigator } from './TabNavigator';
import { Context } from '../Context';

const RootNavigator = () => {
  const PreAuthStack = createStackNavigator();
  const PostAuthStack = createStackNavigator();
  const context = useContext(Context);

  const PreAuthStackScreen = () => (
    <PreAuthStack.Navigator initialRouteName='Landing'>
      <PreAuthStack.Screen
        name='Landing'
        component={Landing}
        options={{ headerShown: false }}
      />
      <PreAuthStack.Screen
        name='LogIn'
        component={LogIn}
        options={{ headerShown: false, gestureEnabled: true }}
      />
      <PreAuthStack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false, gestureEnabled: true }}
      />
    </PreAuthStack.Navigator>
  );

  return context.isAuthenticated ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <PreAuthStackScreen />
    </NavigationContainer>
  );
};

export default RootNavigator;
