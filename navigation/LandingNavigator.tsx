import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactList from '../screens/ContactList/ContactList';
import Home from '../screens/Home/Home';
import SendingJuju from '../screens/SendingJuju/SendingJuju';
import PickJuju from '../screens/PickJuju/PickJuju';
import ReadJuju from '../screens/ReadJuju/ReadJuju';
import Inbox from '../screens/Inbox/Inbox';
import Jujuls from '../screens/Jujuls/Jujuls';

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='SendingJuju' component={SendingJuju} />
      <HomeStack.Screen name='ContactList' component={ContactList} />
      <HomeStack.Screen name='PickJuju' component={PickJuju} />
      <HomeStack.Screen name='ReadJuju' component={ReadJuju} />
      <HomeStack.Screen name='Inbox' component={Inbox} />
      <HomeStack.Screen name='Jujuls' component={Jujuls} />
    </HomeStack.Navigator>
  );
};
