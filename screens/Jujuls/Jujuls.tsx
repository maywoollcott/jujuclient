import React, { useContext, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './Jujuls.style';
import { Jujul } from '../../components/Jujul/Jujul';
import * as apiService from '../../api/apiService';

const Jujuls: React.FC = () => {
  const context = useContext(Context);
  const navigation = useNavigation();

  const logout = async () => {
    await context.signOut();
  };

  const navigateToSendingJuju = () => {
    navigation.navigate('SendingJuju');
  };

  const navigateToInbox = () => {
    navigation.navigate('Inbox');
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
      // we check if we have access to the notification permission
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        // if we don't have access to it, we ask for it
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // user does not allow us to access to the notifications
        alert('Failed to get push token for push notification!');
        return;
      }

      // obtain the expo token
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      // notifications only work on physcal devices
      alert('Must use physical device for Push Notifications');
    }

    // some android configuration
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  };

  const handlePushNotifications = async () => {
    if (context.currentUser.pushNotificationsToken) {
      console.log('dont need to do anything!');
    } else {
      let pushNotificationsToken = await registerForPushNotificationsAsync();
      const storedToken = await SecureStore.getItemAsync('JUJU_AUTH_TOKEN');
      try {
        const updateUserRes = await apiService.updateUser(
          { pushNotificationsToken: pushNotificationsToken },
          storedToken
        );
        if (updateUserRes.status === 200) {
          console.log('updated user with push token');
          context.setCurrentUser(updateUserRes.updatedUser);
        } else {
          console.log('Nework error. Please check your connection!');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handlePushNotifications();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hi, {context.currentUser.name}.</Text>
        <SolidButton
          onPress={navigateToSendingJuju}
          buttonText='Send a juju'
          widthUnits={0.6}
        />
        <SolidButton
          onPress={navigateToInbox}
          buttonText='Read my jujus'
          widthUnits={0.6}
        />
        <View style={styles.dailyJujuContainer}>
          <Text style={styles.subheaderText}>DAILY JUJU</Text>
          <Text style={styles.dailyJujuText}>
            Who is someone that always fights for the underdog?
          </Text>
          <OutlinedButton
            onPress={() => console.log('Answer')}
            buttonText='Answer'
            widthUnits={0.6}
          />
        </View>
      </View>
    </View>
  );
};

export default Jujuls;
