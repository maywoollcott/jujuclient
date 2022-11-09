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
  backButtonContainer: {
    position: 'absolute',
    top: height * 0.025,
    left: 30,
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: COLORS.lavender,
    width: width * 0.7,
    height: 36,
    marginLeft: 20,
    borderRadius: 18,
  },
  jujulContainer: {
    position: 'absolute',
    top: height * 0.03,
    right: 30,
  },
  ContactsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  headerText: {
    marginBottom: height * 0.08,
    color: COLORS.primaryPurple,
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '600',
  },
  subheaderText: {
    color: COLORS.primaryPurple,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '700',
  },
  sendButtonContainer: {
    marginTop: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jujulSubtext: {
    fontSize: 20,
  },
  input: {
    color: COLORS.primaryPurple,
    height: 36,
    fontSize: 20,
    paddingLeft: 15,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 7,
    left: 10,
  },
});
