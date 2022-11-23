import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../../globalStyles';

export const Jujul: React.FC = () => {
  const navigation = useNavigation();

  const pressJujuHandler = () => {
    console.log('pressing');
    navigation.navigate('Jujuls');
  };
  return (
    <TouchableOpacity onPress={pressJujuHandler}>
      <FontAwesome5 name='gem' size={26} color={COLORS.primaryPurple} />
    </TouchableOpacity>
  );
};
