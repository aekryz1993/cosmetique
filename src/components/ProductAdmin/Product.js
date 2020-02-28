import React from 'react';
import {View, StyleSheet} from 'react-native';

import NavigationTabs from './NavigationTabs';

const Product = ({navigation, database}) => {
  const productsCollection = database.collections.get('products');
  const tasksCollection = database.collections.get('tasks');
  const financesCollection = database.collections.get('finances');
  const usersCollection = database.collections.get('users');
  return (
    <View style={styles.container}>
      <NavigationTabs
        productCollection={productsCollection}
        database={database}
        tasksCollection={tasksCollection}
        financesCollection={financesCollection}
        usersCollection={usersCollection}
        navigation={navigation}
      />
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
