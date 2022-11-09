import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../globalStyles';

export const BackArrow: React.FC = () => {
  const navigation = useNavigation();

  const backButtonHandler = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={backButtonHandler}>
      <AntDesign name='arrowleft' size={36} color={COLORS.primaryPurple} />
    </TouchableOpacity>
  );
};
