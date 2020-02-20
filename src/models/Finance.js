import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

export default class Finance extends Model {
  static table = 'finances';

  @field('profit') profit;
  @field('date') date;
  @field('gain') gain;
  @field('spent') spent;
  @field('operation') operation;

  @action async updateGain(sum) {
    try {
      await super.update(finance => {
        finance.gain = finance.gain + sum;
        finance.operation = 'gain';
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action async deleteTaskGain(sum) {
    console.log(sum);
    try {
      await super.update(finance => {
        finance.gain = finance.gain - sum;
        finance.operation = 'gain';
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action async updateSpent(sum) {
    try {
      await super.update(finance => {
        finance.spent = finance.spent + sum;
        finance.operation = 'spend';
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action async updateProfit() {
    try {
      await super.update(finance => {
        if (finance.operation === 'gain') {
          finance.profit = finance.profit + finance.gain;
        } else if (finance.operation === 'spent') {
          finance.profit = finance.profit - finance.spend;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
