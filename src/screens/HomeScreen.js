import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (HomeScreen = () => {
  return (
    <View style={styles.center}>
      <Text>HomeScreen</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
