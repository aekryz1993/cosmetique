import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @field('name') name;
  @field('category') category;
  @field('amount') amount;
  @field('unit') unit;
  @field('buying_price') buying_price;
  @field('selling_price') selling_price;

  @action async deleteTask(finance, price) {
    try {
      await super.destroyPermanently();
      await this.subAction(() => finance.deleteTaskGain(price));
    } catch (error) {
      console.log(error);
    }
  }
}
