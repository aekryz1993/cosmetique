import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';

const PriceSell = ({cardStyle, handleAmountChange}) => {
  const [count, setCount] = useState('1');
  useEffect(() => {
    handleAmountChange(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <View style={cardStyle.priceSellContainer}>
      <Text
        accessibilityRole="button"
        style={[cardStyle.priceButton, {textAlignVertical: 'center'}]}
        onPress={() => {
          const value = Number(count) - 1;
          if (value < 1) {
            return;
          }
          setCount(value.toString());
        }}>
        -
      </Text>
      <TextInput
        style={[cardStyle.inputText, {height: 30, width: 70, paddingBottom: 0}]}
        numeric
        value={count}
        onChangeText={txt => {
          setCount(txt.replace(/[^0-9]/g, ''));
        }}
        keyboardType={'numeric'}
      />
      <Text
        accessibilityRole="button"
        style={[cardStyle.priceButton, {textAlignVertical: 'center'}]}
        onPress={() => {
          const value = Number(count) + 1;
          setCount(value.toString());
        }}>
        +
      </Text>
    </View>
  );
};

export default PriceSell;
