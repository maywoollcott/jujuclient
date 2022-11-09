import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS } from '../../globalStyles';

export const Jujul: React.FC = () => {
  return (
    <TouchableOpacity>
      <FontAwesome5 name='gem' size={26} color={COLORS.primaryPurple} />
    </TouchableOpacity>
  );
};
