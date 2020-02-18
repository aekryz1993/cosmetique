import React from 'react';
import {TextInput} from 'react-native';

export const TextInputField = props => {
  return (
    <TextInput
      style={{height: 40}}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
    />
  );
};
