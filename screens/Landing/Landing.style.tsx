import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: COLORS.primaryPurple,
    fontSize: 125,
    textAlign: 'center',
  },
  subheaderText: {
    color: COLORS.primaryPurple,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: height * 0.1,
  },
  buttonContainer: {},
});
