import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (ChatScreen = () => {
  return (
    <View style={styles.center}>
      <Text>ChatScreen</Text>
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
