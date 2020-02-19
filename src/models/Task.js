import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @field('name') name;
  @field('category') category;
  @field('amount') amount;
  @field('unit') unit;

  @action async deleteTask() {
    try {
      await super.destroyPermanently();
    } catch (error) {
      console.log(error);
    }
  }
}
