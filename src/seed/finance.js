import moment from 'moment';
import {Q} from '@nozbe/watermelondb';

export const addFinance = async (database, collection, today) => {
  try {
    const createFinance = await database.action(async () => {
      const todayFinance = await collection
        .query(Q.where('date', today))
        .fetch();
      if (todayFinance.length !== 0) {
        return;
      }
      await collection.create(finance => {
        finance.profit = 0;
        finance.gain = 0;
        finance.spent = 0;
        finance.operation = '';
        finance.date = moment(Date.now()).format('DD MMMM YYYY');
      });
    });
    return createFinance;
  } catch (error) {
    console.log(error);
  }
};
