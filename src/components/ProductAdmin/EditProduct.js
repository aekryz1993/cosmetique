import React, {useState} from 'react';
import {View, Picker, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';

import {categories} from '../helpers/categories';

const EditProduct = ({
  product,
  setProduct,
  modalStyle,
  setOperation,
  setVisible,
}) => {
  const [productName, setProductName] = useState(product._raw.name);
  const [category, setCategory] = useState(product._raw.category);
  const [amountPieceField, setAmountPieceField] = useState(
    product._raw.amount_piece.toString(),
  );
  const [amountPackField, setAmountPackField] = useState(
    product._raw.amount_pack.toString(),
  );
  const [buyingPricePiece, setbuyingPricePiece] = useState(
    product._raw.buying_price_piece.toString(),
  );
  const [buyingPricePack, setbuyingPricePack] = useState(
    product._raw.buying_price_pack.toString(),
  );
  const [sellingPricePiece, setsellingPricePiece] = useState(
    product._raw.selling_price_piece.toString(),
  );
  const [sellingPricePack, setsellingPricePack] = useState(
    product._raw.selling_price_pack.toString(),
  );

  const _cancel = () => {
    setVisible(false);
    setOperation(null);
    setProduct(null);
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
    await product.updateProduct(body);
    setVisible(false);
    setOperation(null);
    setProduct(null);
  };

  return (
    <View style={modalStyle.container}>
      <ScrollView style={{margin: 20}}>
        <View className={modalStyle.topFields}>
          <TextInput
            mode="flat"
            className={modalStyle.fieldItem}
            label="Le nom de product"
            value={productName}
            onChangeText={ref => setProductName(ref)}
            paddingHorizontal={true}
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
          {/* <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                favSport4: value,
              });
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={this.state.favSport4}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          /> */}
          {/* <RNPickerSelect
            value={category}
            onValueChange={value => setCategory(value)}
            items={categories}
            style={{
              ...pickerSelectStyles,
              // iconContainer: {
              // },
            }}
            Icon={() => {
              return (
                <Icon
                  name="arrow-drop-down"
                  type="material"
                  size={48}
                  color="#eee"
                />
              );
            }}
          /> */}
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
            Confirmer
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProduct;

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
