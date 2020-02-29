import React, {useState} from 'react';
import {View, Picker, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button} from 'react-native-paper';

import {TextInputField} from '../../elements/TextInput';
import {categories} from '../helpers/categories';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

const AddProduct = ({
  usersCollection,
  setVisible,
  setOperation,
  setProduct,
  modalStyle,
}) => {
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState('tab1');
  const [amountPieceField, setAmountPieceField] = useState(null);
  const [amountPackField, setAmountPackField] = useState(null);
  const [buyingPricePiece, setbuyingPricePiece] = useState(null);
  const [buyingPricePack, setbuyingPricePack] = useState(null);
  const [sellingPricePiece, setsellingPricePiece] = useState(null);
  const [sellingPricePack, setsellingPricePack] = useState(null);

  const _cancel = () => {
    setVisible(false);
    setOperation(null);
    setProduct(null);
  };

  const cleanFields = () => {
    setProductName(null);
    setAmountPieceField(null);
    setAmountPackField(null);
    setbuyingPricePiece(null);
    setbuyingPricePack(null);
    setsellingPricePiece(null);
    setsellingPricePack(null);
  };

  const _confirm = async () => {
    const body = {
      productName,
      category,
      amountPieceField,
      amountPackField,
      buyingPricePiece,
      buyingPricePack,
      sellingPricePiece,
      sellingPricePack,
    };
    if (body.amountPackField && category === 'tab1') {
      body.amountPieceField = body.amountPieceField
        ? Number(body.amountPieceField)
        : 0;
      body.amountPieceField =
        Number(body.amountPieceField) + Number(body.amountPackField) * 20;
    }
    const userId = await AsyncStorage.getItem('@user_token');
    const user = await usersCollection.find(userId);
    user.addProduct(body);
    cleanFields();
  };

  return (
    <View>
      <ScrollView style={{margin: 20}}>
        <View className={modalStyle.topFields}>
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Le nom de product"
            value={productName}
            onChangeText={ref => setProductName(ref)}
            // paddingHorizontal={true}
          />
          <Picker
            className={modalStyle.pickerBtn}
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}>
            {categories.map((_category, index) => (
              <Picker.Item
                key={index}
                label={_category.label}
                value={_category.value}
              />
            ))}
          </Picker>
        </View>
        <View className={modalStyle.topFields}>
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="La quantité (Piéce)"
            value={amountPieceField}
            onChangeText={ref => setAmountPieceField(ref)}
          />
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="La quantité (Paquet)"
            value={amountPackField}
            onChangeText={ref => setAmountPackField(ref)}
          />
        </View>
        <View className={modalStyle.topFields}>
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Prix d'achat (Piéce)"
            value={buyingPricePiece}
            onChangeText={ref => setbuyingPricePiece(ref)}
          />
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Prix d'achat (Paquet)"
            value={buyingPricePack}
            onChangeText={ref => setbuyingPricePack(ref)}
          />
        </View>
        <View className={modalStyle.topFields}>
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Prix de vente (Piéce)"
            value={sellingPricePiece}
            onChangeText={ref => setsellingPricePiece(ref)}
          />
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Prix de vente (Paquet)"
            value={sellingPricePack}
            onChangeText={ref => setsellingPricePack(ref)}
          />
        </View>
        <View className={modalStyle.btnsView}>
          <Button mode="flat" onPress={_cancel}>
            Annuler
          </Button>
          <Button mode="contained" onPress={_confirm}>
            Ajouter
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProduct;
