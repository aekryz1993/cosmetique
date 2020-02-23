import React, {useState} from 'react';
import {View, Text} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';

import GroupRadioButtons from '../elements/GroupRadioButtons';
import PriceSell from './PriceSell';
import { tabacException } from './helpers/exceptions/tabac';

const Card = ({product, cardStyle, database, finances}) => {
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
      // eslint-disable-next-line prettier/prettier
      buying_price: unit === 'item' ? product.buying_price_piece : product.buying_price_pack,
      // eslint-disable-next-line prettier/prettier
      selling_price: unit === 'item' ? product.selling_price_piece : product.selling_price_pack,
      exception: 0,
    };
    const tasksCollection = database.collections.get('tasks');

    let price =
      unit === 'item'
        ? product.selling_price_piece * body.amount
        : product.selling_price_pack * body.amount;

    tabacException.map(item => {
      if (
        item.toUpperCase() === product.name.toUpperCase() &&
        unit === 'item'
      ) {
        const excetionalModulo = amount % 4;
        const exceptionalNum = amount - excetionalModulo;
        const exceptionalDev = exceptionalNum / 4;
        const exceptionalTotal = 50 * exceptionalDev;
        body.selling_price =
          exceptionalTotal + body.selling_price * excetionalModulo;
        price = body.selling_price;
        body.exception = 1;
      }
    });
    await database.action(async action => {
      const newTask = await tasksCollection.create(task => {
        task.name = body.name;
        task.category = body.category;
        task.amount = body.amount;
        task.unit = body.unit;
        task.buying_price = body.buying_price;
        task.selling_price = body.selling_price;
        task.exception = body.exception;
      });
      if (newTask) {
        console.log(`${body.name} has been added`);
        await action.subAction(() => finances[0].updateGain(price));
      }
    });
  };
  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.nameStyle}>{product.name}</Text>
      <GroupRadioButtons
        cardStyle={cardStyle}
        hasPacket={product.amount_pack}
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

const enhance = withObservables(
  ['financesCollection'],
  ({today, financesCollection}) => ({
    finances: financesCollection.query(Q.where('date', today)).fetch(),
  }),
);

const EnhancedCard = enhance(Card);

export default EnhancedCard;
