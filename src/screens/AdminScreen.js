import React, {useState} from 'react';
import {View, Picker, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import {TextInputField} from '../elements/TextInput';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

const AdminScreen = ({navigation, usersCollection}) => {
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
          onValueChange={itemValue => setCategory(itemValue)}>
          {categories.map((_category, index) => (
            <Picker.Item
              key={index}
              label={_category.label}
              value={_category.value}
            />
          ))}
        </Picker>

        <TextInputField
          placeholder="Entrez la quantité par piece"
          label="Quantité par piece"
          onChangeText={t => setAmountPieceField(t)}
          value={amountPieceField}
          // errorMessage={error}
        />

        <TextInputField
          placeholder="Entrez la quantité par paquet"
          label="Quantité par paquet"
          onChangeText={t => setAmountPackField(t)}
          value={amountPackField}
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
