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
    marginTop: 36,
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
  dailyJujuContainer: {
    marginTop: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyJujuText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryPurple,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 10,
  },
});
