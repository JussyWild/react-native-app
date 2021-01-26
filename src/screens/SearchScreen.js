import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (SearchScreen = () => {
  return (
    <View style={styles.center}>
      <Text>SearchScreen</Text>
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
