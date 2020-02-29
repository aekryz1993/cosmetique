import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

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
    <View>
      <Text
        style={
          modalStyle.name
        }>{`Etes-vous sûr de vouloir supprimer ${productName}?`}</Text>
      <View style={modalStyle.btnContainer}>
        <Button mode="flat" onPress={_cancel}>
          Annuler
        </Button>
        <Button mode="flat" onPress={_confirm}>
          Confirmer
        </Button>
      </View>
    </View>
  );
};

export default DeleteProduct;
