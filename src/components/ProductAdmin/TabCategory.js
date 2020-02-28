import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import withObservables from '@nozbe/with-observables';
import {Icon} from 'react-native-elements';
import {FAB} from 'react-native-paper';

import tableStyle from '../../stylesheets/elements/table.css';
import ModalDisplay from './ModalDisplay';

const TabCategory = ({
  products,
  database,
  tasksCollection,
  financesCollection,
  navigation,
  usersCollection,
}) => {
  const tableHead = [
    'Nom de product',
    'Quantité (pièce)',
    'Quantité (paquet)',
    '',
  ];
  const widthArr = [200, 150, 150, 310];
  const [modalOpened, setModalOpened] = useState(false);
  const [productFields, setProductFields] = useState({
    name: '',
    amount_piece: null,
    amount_pack: null,
    buying_price_piece: null,
    buying_price_pack: null,
    selling_price_piece: null,
    selling_price_pack: null,
  });
  const [operation, setOperation] = useState(null);
  const [product, setProduct] = useState(null);

  const _editProduct = data => {
    console.log(data);
  };

  const _deleteProduct = data => {
    setProduct(data);
    setOperation('delete');
    setModalOpened(true);
  };

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
    setOperation('read');
    setModalOpened(true);
  };

  const _addProduct = () => {
    setOperation('add');
    setModalOpened(true);
  };

  const element = (data, index, item) =>
    data.map((cell, cellIndex) => {
      const cellElement =
        cellIndex === 3 ? (
          <View style={tableStyle.actionUD}>
            <Icon name="edit" color="gray" onPress={() => _editProduct(item)} />
            <Icon
              name="delete"
              color="red"
              onPress={() => _deleteProduct(item)}
            />
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
      <FAB
        style={styles.fab}
        small
        icon={require('../../../public/images/plus.png')}
        onPress={() => _addProduct()}
      />
      <View style={tableStyle.height}>
        <ModalDisplay
          visible={modalOpened}
          setVisible={setModalOpened}
          productFields={productFields}
          operation={operation}
          setOperation={setOperation}
          navigation={navigation}
          usersCollection={usersCollection}
          product={product}
          setProduct={setProduct}
        />

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
                    data={element(rowProduct, index, item)}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});

const enhance = withObservables(['products'], ({products}) => ({
  products: products.observe(),
}));

const EnhancedTabCategory = enhance(TabCategory);

export default EnhancedTabCategory;
