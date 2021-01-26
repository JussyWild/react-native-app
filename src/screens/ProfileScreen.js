import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (ProfileScreen = () => {
  return (
    <View style={styles.center}>
      <Text>ProfileScreen</Text>
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
