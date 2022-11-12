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
  jujulContainer: {
    position: 'absolute',
    top: height * 0.03,
    right: 30,
  },
  headerContainer: {
    width: '73%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginBottom: height * 0.03,
    color: COLORS.primaryPurple,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '600',
  },
  subheaderContainer: {
    marginBottom: height * 0.07,
  },
  subheaderText: {
    color: COLORS.primaryPurple,
    fontSize: 14,
    textAlign: 'center',
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    margin: 0,
  },
  messageText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryPurple,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  backButtonContainer: {
    position: 'absolute',
    top: height * 0.02,
    left: 30,
  },
});
