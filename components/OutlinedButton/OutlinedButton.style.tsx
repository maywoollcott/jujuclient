import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 30,
    margin: 10,
    borderColor: COLORS.primaryPurple,
    borderWidth: 3,
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryPurple,
  },
});
