import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Product = () => {
  return (
    <View style={styles.container}>
      <Text>Users</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
