import React from 'react';
import {View, Text} from 'react-native';

const DisplayProduct = ({productFields, modalStyle}) => {
  return (
    <View>
      <View style={modalStyle.container}>
        <Text style={modalStyle.name}>{productFields.name}</Text>
        <View style={modalStyle.otherFieldsContainer}>
          <Text style={modalStyle.otherFields}>
            {`Quantité (pièce): ${productFields.amountPiece}`}
          </Text>
          <Text style={modalStyle.otherFields}>
            {`Quantité (paquet): ${productFields.amountPack}`}
          </Text>
          <Text style={modalStyle.otherFields}>
            {`Prix d'achat (pièce): ${productFields.buyingPricePiece} DA`}
          </Text>
          <Text style={modalStyle.otherFields}>
            {`Prix d'achat (paquet): ${productFields.buyingPricePack} DA`}
          </Text>
          <Text style={modalStyle.otherFields}>
            {`Prix de vente (pièce): ${productFields.sellingPricePiece} DA`}
          </Text>
          <Text style={modalStyle.otherFields}>
            {`Prix de vente (paquet): ${productFields.sellingPricePack} DA`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DisplayProduct;
