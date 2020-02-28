import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import withObservables from '@nozbe/with-observables';
import {Icon} from 'react-native-elements';

import tableStyle from '../../stylesheets/elements/table.css';
import modalStyle from '../../stylesheets/components/modalProduct.css';

const TabCategory = ({
  products,
  database,
  tasksCollection,
  financesCollection,
}) => {
  const tableHead = [
    'Nom de product',
    'Quantité (pièce)',
    'Quantité (paquet)',
    '',
  ];
  const widthArr = [200, 150, 150, 310];
  const [modelOpened, setModalOpened] = useState(false);
  const [productFields, setProductFields] = useState({
    name: '',
    amount_piece: null,
    amount_pack: null,
    buying_price_piece: null,
    buying_price_pack: null,
    selling_price_piece: null,
    selling_price_pack: null,
  });

  // const _alertIndex = (index, item) => {};

  const _displayProduct = (index, item) => {
    setProductFields({
      name: item.name,
      amountPiece: item.amount_piece,
      amountPack: item.amount_pack,
      buyingPricePiece: item.buying_price_piece,
      buyingPricePack: item.buying_price_pack,
      sellingPricePiece: item.selling_price_piece,
      sellingPricePack: item.selling_price_pack,
    });
    setModalOpened(true);
  };

  const element = (data, index) =>
    data.map((cell, cellIndex) => {
      const cellElement =
        cellIndex === 3 ? (
          <View style={tableStyle.actionUD}>
            <Icon name="edit" color="gray" />
            <Icon name="delete" color="red" />
          </View>
        ) : cellIndex === 0 ? (
          <Text style={styles.textRowName}>{cell}</Text>
        ) : (
          cell
        );
      return cellElement;
    });

  return (
    <View style={tableStyle.container}>
      <View style={tableStyle.height}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modelOpened}
          onDismiss={() => setModalOpened(false)}
          onRequestClose={() => setModalOpened(false)}>
          <View style={modalStyle.container}>
            <TouchableOpacity
              style={modalStyle.closebtn}
              onPress={() => setModalOpened(false)}>
              <Image source={require('../../../public/images/close.png')} />
            </TouchableOpacity>
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
        </Modal>

        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row
            data={tableHead}
            widthArr={widthArr}
            style={styles.header}
            textStyle={styles.text}
          />
        </Table>
        <Table>
          <FlatList
            data={products}
            renderItem={({item, index}) => {
              const rowProduct = [
                item._raw.name,
                item._raw.amount_piece,
                item._raw.amount_pack,
                '',
              ];
              return (
                <TouchableOpacity
                  onPress={() => _displayProduct(index, item._raw)}>
                  <Row
                    key={index}
                    data={element(rowProduct, index)}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#F7F6E7'},
                    ]}
                    textStyle={styles.textRow}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {height: 30, backgroundColor: '#537791'},
  text: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 10,
    color: 'aliceblue',
  },
  textRow: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 14,
    color: '#555',
    height: 30,
  },
  textRowName: {
    marginLeft: 6,
    fontWeight: '100',
    fontSize: 14,
    color: '#555',
    // height: 50,
  },
  dataWrapper: {marginTop: -1},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
});

const enhance = withObservables(['products'], ({products}) => ({
  products,
}));

const EnhancedTabCategory = enhance(TabCategory);

export default EnhancedTabCategory;
