import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  backButtonContainer: {
    position: 'absolute',
    top: height * 0.02,
    left: 30,
  },
  jujulContainer: {
    position: 'absolute',
    top: height * 0.03,
    right: 30,
  },
  headerContainer: {
    width: '68%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
  },
  headerText: {
    marginVertical: height * 0.03,
    color: COLORS.primaryPurple,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '600',
  },
  sendButtonContainer: {
    marginTop: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jujulSubtext: {
    fontSize: 20,
  },
  messageText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryPurple,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 20,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    flex: 1,
  },
});
