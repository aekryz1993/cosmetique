import React, {useState} from 'react';
import {View, Picker, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import {TextInputField} from '../elements/TextInput';
import AdminDrawserNav from './helpers/AdminDrawerNav';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
});

const AdminScreen = ({navigation, usersCollection, database}) => {
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState('tab1');
  const [amountPieceField, setAmountPieceField] = useState(null);
  const [amountPackField, setAmountPackField] = useState(null);
  const [buyingPricePiece, setbuyingPricePiece] = useState(null);
  const [buyingPricePack, setbuyingPricePack] = useState(null);
  const [sellingPricePiece, setsellingPricePiece] = useState(null);
  const [sellingPricePack, setsellingPricePack] = useState(null);

  const cleanFields = () => {
    setProductName(null);
    setAmountPieceField(null);
    setAmountPackField(null);
    setbuyingPricePiece(null);
    setbuyingPricePack(null);
    setsellingPricePiece(null);
    setsellingPricePack(null);
  };

  const addProduct = async () => {
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

  const categories = [
    {label: 'Tabac', value: 'tab1'},
    {label: 'Boisson', value: 'tab2'},
    {label: 'Bonbons', value: 'tab3'},
    {label: 'Chocolat', value: 'tab4'},
    {label: 'Cosmétique', value: 'tab5'},
    {label: 'Informatique', value: 'tab6'},
    {label: 'Flexy', value: 'tab7'},
    {label: 'Tab8', value: 'tab8'},
  ];

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  return (
    <View style={style.container}>
      <AdminDrawserNav navigationProps={navigation} />
    </View>
  );
};

export default AdminScreen;
