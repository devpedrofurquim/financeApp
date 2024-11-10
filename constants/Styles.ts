import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  header: {
    fontSize: 40,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  textLink: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '500',
  },
  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 18,
    marginTop: 20,
    color: Colors.gray,
  },
});
