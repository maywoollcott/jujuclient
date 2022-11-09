import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  AppRegistry,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { styles } from './SignUp.style';
import { COLORS } from '../../globalStyles';
import { SolidButton } from '../../components/SolidButton/SolidButton';
import { BackArrow } from '../../components/BackArrow/BackArrow';
import { signUp } from '../../api/apiService';
import { SignInRes } from '../../types';
import { Context } from '../../Context';

const SignUp: React.FC = () => {
  const [signUpData, setSignUpData] = useState({
    phoneNumber: '',
    name: '',
    password: '',
    verifyPassword: '',
  });

  const navigation = useNavigation();
  const context = useContext(Context);

  const logInHereHandler = () => {
    navigation.navigate('LogIn');
  };

  const signUpHandler = async () => {
    const newUser = {
      name: signUpData.name,
      password: signUpData.password,
      phoneNumber: signUpData.phoneNumber,
      jujuls: '1',
    };
    console.log('about to sign up');
    await context.signUp(newUser);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-64}
        style={styles.screenContainer}
      >
        <View style={styles.backButtonContainer}>
          <BackArrow />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>sign up</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Phone number'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, phoneNumber: text })
            }
            style={styles.input}
            autoCapitalize='none'
            keyboardType='phone-pad'
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, password: text })
            }
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <TextInput
            placeholder='Verify password'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, verifyPassword: text })
            }
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <TextInput
            placeholder='Name'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, name: text })
            }
            style={styles.input}
          />
          <Text style={styles.inputInfoText}>
            Don't worry, we'll NEVER share your name. It's only used to
            personalize your experience.
          </Text>
        </View>
        <SolidButton buttonText='Sign up' onPress={signUpHandler} />
        <TouchableOpacity
          style={styles.centeredTextContainer}
          onPress={logInHereHandler}
        >
          <Text style={styles.rerouteText}>Already have an account?</Text>
          <Text style={styles.rerouteText}>Log in here.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
