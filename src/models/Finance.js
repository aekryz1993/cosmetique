import {Model, Q} from '@nozbe/watermelondb';
import {field, action, lazy} from '@nozbe/watermelondb/decorators';

export default class Finance extends Model {
  static table = 'finances';

  @field('profit') profit;
  @field('date') date;
  @field('gain') gain;
  @field('spent') spent;
  @field('operation') operation;

  @lazy tasks = this.collections.get('tasks').query();
  @lazy products = taskName =>
    this.collections.get('products').query(Q.where('name', taskName));

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

  @action async deleteTaskGain(sum, amount, exception) {
    try {
      await super.update(finance => {
        if (!exception) {
          finance.gain = finance.gain - sum * amount;
        } else {
          finance.gain = finance.gain - sum;
        }
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

  @action async updateProfit(tasks, _finance) {
    try {
      await super.update(finance => {
        if (finance.operation === 'gain') {
          finance.profit = finance.profit + finance.gain;
          finance.gain = 0;
        } else if (finance.operation === 'spent') {
          finance.profit = finance.profit - finance.spend;
          finance.spend = 0;
        }
      });
      // return this;
      // await this.subAction(() =>
      //   tasks.map(async task => {
      //     const products = await _finance.products(task._raw.name).fetch();
      //     products[0].updateSell(task._raw.amount, task);
      //   }),
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
