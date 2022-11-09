import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 30,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: COLORS.white,
  },
});
