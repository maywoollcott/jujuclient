import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { styles } from './SolidButton.style';

interface SolidButtonProps {
  onPress: () => void;
  buttonText: string;
  widthUnits: any;
}

export const SolidButton: React.FC<SolidButtonProps> = ({
  onPress,
  buttonText,
  widthUnits,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.container, width: width * widthUnits }}
        onPress={onPress}
      >
        <Text style={styles.text}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
