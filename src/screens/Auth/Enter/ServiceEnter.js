import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChText, THEME } from '../../../toolkit/components';

export default (ServiceEnter = (props) => {
  return (
    <>
      <ChText style={{ ...styles.text, ...props.style }}>Или продолжите через:</ChText>
      <View style={styles.container}>
        <Ionicons style={styles.icon} name="logo-vk" />
        <Ionicons style={styles.icon} name="logo-google" />
        <Ionicons style={styles.icon} name="logo-instagram" />
        <Ionicons style={styles.icon} name="logo-facebook" />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: THEME.AUTH_MAIN_BACKGROUND_COLOR,
  },
  text: {
    marginBottom: 10,
  },
  icon: {
    fontSize: 64,
    marginHorizontal: '5%',
  },
});
