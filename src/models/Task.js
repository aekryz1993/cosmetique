import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @field('name') name;
  @field('category') category;
  @field('amount') amount;
  @field('unit') unit;

  @action async addTask(body) {
    try {
      return await this.collections.get('tasks').create(task => {
        task.name = body.name;
        task.category = body.category;
        task.amount = body.amount;
        task.unit = body.unit;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
