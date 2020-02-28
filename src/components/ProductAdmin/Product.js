import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Modal, FAB, Button, Provider} from 'react-native-paper';

import NavigationTabs from './NavigationTabs';
import modalStyle from '../../stylesheets/components/modalProduct.css';
import AddProduct from './AddProduct';

const Product = ({navigation, database}) => {
  const productsCollection = database.collections.get('products');
  const tasksCollection = database.collections.get('tasks');
  const financesCollection = database.collections.get('finances');
  const usersCollection = database.collections.get('users');

  const [modalOpened, setModalOpened] = useState(false);

  const _addProduct = () => {
    setModalOpened(true);
  };

  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        small
        icon={require('../../../public/images/plus.png')}
        onPress={() => _addProduct()}
      />
      <NavigationTabs
        productCollection={productsCollection}
        database={database}
        tasksCollection={tasksCollection}
        financesCollection={financesCollection}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpened}
        onDismiss={() => setModalOpened(false)}
        onRequestClose={() => setModalOpened(false)}>
        <View style={modalStyle.container}>
          <TouchableOpacity
            style={modalStyle.closebtn}
            onPress={() => setModalOpened(false)}>
            <Image source={require('../../../public/images/close.png')} />
          </TouchableOpacity>
          <AddProduct
            navigation={navigation}
            usersCollection={usersCollection}
          />
        </View>
      </Modal>
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
  // fab: {
  //   borderRadius: 50,
  // },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});
