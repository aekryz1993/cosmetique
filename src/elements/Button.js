import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Almarai-Bold',
    fontWeight: 'bold',
  },
});

export default function({
  bgColor = '#2a2a7e',
  textColor = '#fff',
  onPress,
  disabled,
  children,
}) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...style.button,
        backgroundColor: disabled ? '#9a9a9a' : bgColor,
      }}
      onPress={!disabled ? onPress : null}>
      <Text style={{...style.text, color: textColor}}>{children}</Text>
    </TouchableOpacity>
  );
}
