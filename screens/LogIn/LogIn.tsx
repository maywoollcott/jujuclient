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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import * as SecureStore from 'expo-secure-store';
import { styles } from './LogIn.style';
import { COLORS } from '../../globalStyles';
import { SolidButton } from '../../components/SolidButton/SolidButton';
import { BackArrow } from '../../components/BackArrow/BackArrow';
import { Context } from '../../Context';
// import { login } from '../../apiService/loginFlow';
// import AppLoading from '../AppLoading/AppLoading';
// import { loginResponse } from '../../types';

const SignIn: React.FC = () => {
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: '',
  });

  const navigation = useNavigation();
  const context = useContext(Context);

  const signUpHereHandler = () => {
    navigation.navigate('SignUp');
  };

  const loginButtonHandler = async () => {
    Keyboard.dismiss();
    await context.signIn(loginData.phoneNumber, loginData.password);
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
          <Text style={styles.headerText}>log in</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Phone number'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setLoginData({ ...loginData, phoneNumber: text })
            }
            style={styles.input}
            autoCapitalize='none'
            keyboardType='phone-pad'
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor={COLORS.primaryPurple}
            onChangeText={(text) =>
              setLoginData({ ...loginData, password: text })
            }
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>
        <SolidButton
          buttonText='Log in'
          onPress={loginButtonHandler}
          widthUnits={0.6}
        />
        <TouchableOpacity
          style={styles.centeredTextContainer}
          onPress={signUpHereHandler}
        >
          <Text style={styles.rerouteText}>Don't have an account?</Text>
          <Text style={styles.rerouteText}>Sign up here.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
