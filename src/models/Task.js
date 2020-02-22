import {Model} from '@nozbe/watermelondb';
import {field, action, lazy} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @field('name') name;
  @field('category') category;
  @field('amount') amount;
  @field('unit') unit;
  @field('buying_price') buying_price;
  @field('selling_price') selling_price;

  @action async deleteTask(finance, price, amount) {
    try {
      await super.destroyPermanently();
      await this.subAction(() => finance.deleteTaskGain(price, amount));
    } catch (error) {
      console.log(error);
    }
  }

  @action async deleteOnlyTasks() {
    try {
      await super.destroyPermanently();
    } catch (error) {
      console.log(error);
    }
  }
}
