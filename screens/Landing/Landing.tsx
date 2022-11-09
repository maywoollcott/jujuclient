import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { styles } from './Landing.style';
import { SolidButton } from '../../components/SolidButton/SolidButton';
import { useAuthentication } from '../../utils/useAuth';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  // useAuthentication();

  const logInButtonHandler = () => {
    navigation.navigate('LogIn');
  };

  const signUpButtonHandler = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>juju</Text>
        <Text style={styles.subheaderText}>
          the anonymous gratitude and admiration app
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <SolidButton
          onPress={logInButtonHandler}
          buttonText={'Log in'}
          widthUnits={1}
        />
        <SolidButton
          onPress={signUpButtonHandler}
          buttonText={'Sign up'}
          widthUnits={1}
        />
      </View>
    </View>
  );
};

export default Landing;
