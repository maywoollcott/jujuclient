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
    top: height * 0.07,
    left: 30,
  },
  headerContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  headerText: {
    color: COLORS.primaryPurple,
    fontSize: 60,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  input: {
    color: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurple,
    borderWidth: 3,
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    paddingLeft: 15,
    marginVertical: 10,
    width: '80%',
  },
  centeredTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  rerouteText: {
    fontSize: 18,
    color: COLORS.primaryPurple,
    textAlign: 'center',
  },
  rerouteTextPassword: {
    fontSize: 18,
    color: COLORS.primaryPurple,
    textAlign: 'center',
    marginBottom: '15%',
  },
});
