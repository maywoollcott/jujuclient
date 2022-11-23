import React, { useContext, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

import { SolidButton } from '../../components/SolidButton/SolidButton';
import { OutlinedButton } from '../../components/OutlinedButton/OutlinedButton';
import { Context } from '../../Context';
import { styles } from './Home.style';
import { Jujul } from '../../components/Jujul/Jujul';
import * as apiService from '../../api/apiService';

const Home: React.FC = () => {
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

  return (
    <View style={styles.screenContainer}>
      <View style={styles.jujulContainer}>
        <Jujul />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Jujuls.</Text>
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
      </View>
    </View>
  );
};

export default Home;
