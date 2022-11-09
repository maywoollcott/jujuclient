import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../globalStyles';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    width: width * 0.8,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 18,
    color: COLORS.primaryPurple,
  },
  initialsText: {
    fontSize: 18,
    color: COLORS.primaryPurple,
    textAlign: 'center',
  },
  numberText: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
  photoContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '75%',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
  },
  nameCircle: {
    backgroundColor: COLORS.lavender,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
