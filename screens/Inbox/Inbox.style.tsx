import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  screenContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  jujulContainer: {
    position: 'absolute',
    top: height * 0.03,
    right: 30,
  },
  tabContainer: {
    marginTop: height * 0.08,
    flexDirection: 'row',
  },
  subheaderText: {
    color: COLORS.primaryPurple,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  subheaderContainer: {
    width: '65%',
    marginVertical: height * 0.03,
  },
  dailyJujuContainer: {
    marginTop: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readJujuText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryPurple,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 25,
  },
  readJujuContainer: {
    width: '85%',
    flex: 1,
  },
  unreadDotContainer: {
    position: 'absolute',
    right: width * 0.04,
    top: 15,
  },
  envelopeContainer: {
    position: 'absolute',
    right: width * 0.07,
    top: 28,
  },
  unreadJujuContainer: {
    marginBottom: height * 0.03,
  },
});
