import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { styles } from './OutlinedButton.style';

interface OutlinedButtonProps {
  onPress: () => void;
  buttonText: string;
  widthUnits: any;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onPress,
  buttonText,
  widthUnits,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.container, width: widthUnits * width }}
        onPress={onPress}
      >
        <Text style={styles.text}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
