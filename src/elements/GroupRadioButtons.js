import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

const radioOptions = [
  {
    key: 'item',
    text: 'Pièce',
  },
  {
    key: 'packet',
    text: 'Paquet',
  },
];

const GroupRadioButtons = ({cardStyle, handleUnitChange}) => {
  const [value, setValue] = useState('item');

  const checkedRadio = key => (value === key ? cardStyle.checkedradio : '');

  return (
    <View style={cardStyle.radioContainer}>
      {radioOptions.map(item => {
        return (
          <TouchableOpacity
            style={[cardStyle.radioButton, checkedRadio(item.key)]}
            key={item.key}
            onPress={() => {
              setValue(item.key);
              handleUnitChange(item.key);
            }}>
            <Text style={cardStyle.radioText}>{item.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default GroupRadioButtons;
