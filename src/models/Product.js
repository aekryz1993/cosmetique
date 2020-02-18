import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';

  @field('name') name;
  @field('category') category;
  @field('amount') amount;
  @field('buying_price_piece') buying_price_piece;
  @field('buying_price_pack') buying_price_pack;
  @field('selling_price_piece') selling_price_piece;
  @field('selling_price_pack') selling_price_pack;
}
