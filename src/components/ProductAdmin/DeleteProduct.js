import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const DeleteProduct = ({
  product,
  setProduct,
  modalStyle,
  setOperation,
  setVisible,
}) => {
  const _cancel = () => {
    setVisible(false);
    setOperation(null);
    setProduct(null);
  };

  const _confirm = async () => {
    await product.deleteProduct();
    setVisible(false);
    setOperation(null);
    setProduct(null);
  };

  const productName = product && product._raw ? product._raw.name : '';
  return (
    <View style={modalStyle.container}>
      <Text
        style={
          modalStyle.name
        }>{`Etes-vous sûr de vouloir supprimer ${productName}`}</Text>
      <View style={modalStyle.btnContainer}>
        <TouchableOpacity onPress={_cancel}>
          <Text>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_confirm}>
          <Text>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteProduct;
