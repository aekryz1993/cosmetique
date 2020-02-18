import React, {useEffect, useState} from 'react';
import {View, Picker, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import withObservables from '@nozbe/with-observables';

import {TextInputField} from '../elements/TextInput';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

// const AdminScreen = ({navigation, database}) => {
const AdminScreen = ({navigation, usersCollection}) => {
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState('tab1');
  const [amountField, setAmountField] = useState('0');
  const [buyingPricePiece, setbuyingPricePiece] = useState('0');
  const [buyingPricePack, setbuyingPricePack] = useState('0');
  const [sellingPricePiece, setsellingPricePiece] = useState('0');
  const [sellingPricePack, setsellingPricePack] = useState('0');

  const addProduct = async () => {
    const body = {
      productName,
      category,
      amountField,
      buyingPricePiece,
      buyingPricePack,
      sellingPricePiece,
      sellingPricePack,
    };
    const userId = await AsyncStorage.getItem('@user_token');
    const user = await usersCollection.find(userId);
    user.addProduct(body);
  };

  const categories = [
    {label: 'Tab1', value: 'tab1'},
    {label: 'Tab2', value: 'tab2'},
    {label: 'Tab3', value: 'tab3'},
    {label: 'Tab4', value: 'tab4'},
    {label: 'Tab5', value: 'tab5'},
    {label: 'Tab6', value: 'tab6'},
    {label: 'Tab7', value: 'tab7'},
    {label: 'Tab8', value: 'tab8'},
  ];

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  return (
    <View style={style.container}>
      <Button title="Logout" onPress={() => logout()} />
      <ScrollView>
        <TextInputField
          placeholder="Entrez le nom de produit"
          label="Nom de produit"
          onChangeText={t => setProductName(t)}
          value={productName}
          // errorMessage={error}
        />

        <Picker
          selectedValue={category}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map((_category, index) => (
            <Picker.Item
              key={index}
              label={_category.label}
              value={_category.value}
            />
          ))}
        </Picker>

        <TextInputField
          placeholder="Entrez la quantité"
          label="Quantité"
          onChangeText={t => setAmountField(t)}
          value={amountField}
          // errorMessage={error}
        />

        <TextInputField
          placeholder="Prix d'achat par piece"
          label="Entrez le prix d'achat par piece"
          onChangeText={t => setbuyingPricePiece(t)}
          // errorMessage={error}
          value={buyingPricePiece}
        />
        <TextInputField
          placeholder="Prix d'achat par paquet"
          label="Entrez le prix d'achat par paquet"
          onChangeText={t => setbuyingPricePack(t)}
          // errorMessage={error}
          value={buyingPricePack}
        />
        <TextInputField
          placeholder="Entrez le prix de vente par piece"
          label="Prix de vente par piece"
          onChangeText={t => setsellingPricePiece(t)}
          // errorMessage={error}
          value={sellingPricePiece}
        />
        <TextInputField
          placeholder="Entrez le prix de vente par paquet"
          label="Prix de vente par paquet"
          onChangeText={t => setsellingPricePack(t)}
          // errorMessage={error}
          value={sellingPricePack}
        />

        <Button title="Ajouter" onPress={() => addProduct()} />
      </ScrollView>
    </View>
  );
};

export default AdminScreen;
