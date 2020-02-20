import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import withObservables from '@nozbe/with-observables';

import sumTotalStyle from '../stylesheets/components/sumTotal.css';

const SumTotal = ({finance}) => {
  const financeGain = finance && finance._raw ? finance._raw.gain : 0;
  return (
    <View className={sumTotalStyle.container}>
      <Text className={sumTotalStyle.sum}>{financeGain}</Text>
      <Button className={sumTotalStyle.button} title={'Total à payer'} />
    </View>
  );
};

const enhance = withObservables(['finances'], ({finances}) => ({
  finance: finances[0],
}));

const EnhancedCard = enhance(SumTotal);

export default EnhancedCard;
