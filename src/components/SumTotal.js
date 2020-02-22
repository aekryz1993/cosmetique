import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import withObservables from '@nozbe/with-observables';

import sumTotalStyle from '../stylesheets/components/sumTotal.css';

const SumTotal = ({finance, tasksCollection}) => {
  const financeGain = finance && finance._raw ? finance._raw.gain : 0;

  const finalSum = () => {
    const updateProfit = () =>
      new Promise(async (resolve, reject) => {
        const profitUpdated = await finance.updateProfit();
        resolve(profitUpdated);
      });
    updateProfit().then(async () => {
      const tasks = await tasksCollection.query().fetch();
      tasks.map(async task => {
        const products = await finance.products(task._raw.name).fetch();
        products[0].updateSell(task._raw.amount, task);
      });
    });
  };

  return (
    <View className={sumTotalStyle.container}>
      <Text className={sumTotalStyle.sum}>{financeGain}</Text>
      <Button
        className={sumTotalStyle.button}
        title={'Total à payer'}
        onPress={() => finalSum()}
      />
    </View>
  );
};

const enhance = withObservables(['finances'], ({finances}) => ({
  finance: finances[0],
}));

const EnhancedCard = enhance(SumTotal);

export default EnhancedCard;
