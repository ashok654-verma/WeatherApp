import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const ErrorMessage = ({ message }: { message: string }) => (
  <Text style={styles.error}>{message}</Text>
);

const styles = StyleSheet.create({
  error: {
    color: colors.white,
    textAlign: 'center',
    marginVertical: 16,
    fontSize : 18,
    fontWeight : '600'
  },
});

export default ErrorMessage;
