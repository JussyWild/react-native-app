import React from 'react';
import { StyleSheet, Text } from 'react-native';
import THEME from './theme';

export default (ChText = (props) => {
  return <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>;
});

const styles = StyleSheet.create({
  default: {
    color: THEME.TEXT_COLOR,
    fontFamily: THEME.FONT_FAMILY,
    fontSize: THEME.FONT_SIZE,
  },
});
