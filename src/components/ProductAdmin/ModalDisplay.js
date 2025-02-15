import React from 'react';
import Modal from 'react-native-modal';
import {View, TouchableOpacity, Image} from 'react-native';

import modalStyle from '../../stylesheets/components/modalProduct.css';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import DisplayProduct from './DisplayProduct';
import EditProduct from './EditProduct';

const ModalDisplay = ({
  visible,
  setVisible,
  productFields,
  operation,
  setOperation,
  navigation,
  usersCollection,
  product,
  setProduct,
}) => {
  const _closeModal = () => {
    setOperation(null);
    setVisible(false);
  };
  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInLeft'}
      animationInTiming={500}
      animationOut={'slideOutRight'}
      animationOutTiming={300}
      avoidKeyboard={true}
      style={operation === 'delete' && modalStyle.smallContainer}>
      <View style={modalStyle.container}>
        <TouchableOpacity style={modalStyle.closebtn} onPress={_closeModal}>
          <Image source={require('../../../public/images/close.png')} />
        </TouchableOpacity>
        {operation === 'read' && (
          <DisplayProduct
            productFields={productFields}
            modalStyle={modalStyle}
          />
        )}
        {operation === 'add' && (
          <AddProduct
            navigation={navigation}
            usersCollection={usersCollection}
            setProduct={setProduct}
            modalStyle={modalStyle}
            setVisible={setVisible}
            setOperation={setOperation}
          />
        )}

        {operation === 'update' && (
          <EditProduct
            product={product}
            setProduct={setProduct}
            modalStyle={modalStyle}
            setVisible={setVisible}
            setOperation={setOperation}
          />
        )}

        {operation === 'delete' && (
          <DeleteProduct
            product={product}
            setProduct={setProduct}
            modalStyle={modalStyle}
            setVisible={setVisible}
            setOperation={setOperation}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalDisplay;
