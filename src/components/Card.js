import React, {useState} from 'react';
import {View, Text} from 'react-native';

import GroupRadioButtons from '../elements/GroupRadioButtons';
import PriceSell from './PriceSell';
import withObservables from '@nozbe/with-observables';

const Card = ({product, cardStyle, database, tasks}) => {
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('item');
  const handleAmountChange = amountChange => {
    setAmount(Number(amountChange));
  };

  const handleUnitChange = unitChange => {
    setUnit(unitChange);
  };

  const addTask = async () => {
    const body = {
      name: product.name,
      category: product.category,
      amount: amount,
      unit: unit,
    };

    const tasksCollection = database.collections.get('tasks');
    await database.action(async () => {
      const newTask = await tasksCollection.create(task => {
        task.name = body.name;
        task.category = body.category;
        task.amount = body.amount;
        task.unit = body.unit;
      });
      if (newTask) {
        console.log(`${body.name} has been added`);
      }
    });
  };
  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.nameStyle}>{product.name}</Text>
      <GroupRadioButtons
        cardStyle={cardStyle}
        handleUnitChange={handleUnitChange}
      />
      <PriceSell
        cardStyle={cardStyle}
        handleAmountChange={handleAmountChange}
      />
      <Text style={cardStyle.xxx} onPress={() => addTask()}>
        +
      </Text>
    </View>
  );
};

const enhance = withObservables(['tasks'], ({tasks}) => ({
  tasks,
}));

const EnhancedCard = enhance(Card);

export default EnhancedCard;
