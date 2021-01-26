import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import THEME from './theme';

export default (ChTouchableOpacity = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.default, ...props.style }}
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.2}
      onChangeText={props.onChangeText}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  default: {
    backgroundColor: THEME.AUTH_MAIN_BACKGROUND_COLOR,
  },
});
