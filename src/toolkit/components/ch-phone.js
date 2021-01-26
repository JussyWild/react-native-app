import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import THEME from './theme';

export default (ChPhone = (props) => {
  return (
    <TextInputMask
      type={'custom'}
      options={{
        mask: '+7 (999) 999-99-99',
      }}
      value={props.value}
      onChangeText={(text) => props.onChangeText(text)}
      style={{ ...styles.default, ...props.style }}
      placeholder="+7 800 55 35 35"
      placeholderTextColor="gray"
      keyboardType="number-pad"
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
