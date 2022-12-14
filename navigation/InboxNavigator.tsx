import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactList from '../screens/ContactList/ContactList';
import Inbox from '../screens/Inbox/Inbox';
import SendingJuju from '../screens/SendingJuju/SendingJuju';
import PickJuju from '../screens/PickJuju/PickJuju';
import ReadJuju from '../screens/ReadJuju/ReadJuju';

const InboxStack = createStackNavigator();

export const InboxNavigator = () => {
  return (
    <InboxStack.Navigator
      initialRouteName='Inbox'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <InboxStack.Screen name='Inbox' component={Inbox} />
      <InboxStack.Screen name='ReadJuju' component={ReadJuju} />
    </InboxStack.Navigator>
  );
};
