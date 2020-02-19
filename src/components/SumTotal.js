import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import sumTotalStyle from '../stylesheets/components/sumTotal.css';

const SumTotal = () => {
  const [sum, setSum] = useState('');

  return (
    <View className={sumTotalStyle.container}>
      <Text className={sumTotalStyle.sum}>{sum}</Text>
      <Button className={sumTotalStyle.button} title={'Total à payer'} />
    </View>
  );
};

export default SumTotal;
