import React from 'react';
import { StyleSheet } from 'react-native';
import THEME from './theme';
import ChInput from './сh-input';

export default (ChEmail = (props) => {
  return (
    <ChInput
      style={{ ...styles.default, ...props.style }}
      placeholder="example@gmail.com"
      onChangeText={(text) => props.onChangeText(text)}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      value={props.value}
    />
  );
});

const styles = StyleSheet.create({
  default: {
    borderColor: THEME.AUTH_INPUT_BORDER_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
