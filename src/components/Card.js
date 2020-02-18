import React, {useState} from 'react';
import {View, Text} from 'react-native';

import GroupRadioButtons from '../elements/GroupRadioButtons';
import PriceSell from './PriceSell';

const Card = ({product, cardStyle, database}) => {
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
      return newTask;
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

export default Card;
