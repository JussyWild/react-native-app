import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import THEME from './theme';

export default (ChInput = (props) => {
  return (
    <TextInput
      style={{ ...styles.default, ...props.style }}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={props.onChangeText}
      onSubmitEditing={props.onSubmitEditing}
      value={props.value}
      maxLength={props.maxLength}
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
