import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';

  @field('name') name;
  @field('category') category;
  @field('amount_piece') amount_piece;
  @field('amount_pack') amount_pack;
  @field('buying_price_piece') buying_price_piece;
  @field('buying_price_pack') buying_price_pack;
  @field('selling_price_piece') selling_price_piece;
  @field('selling_price_pack') selling_price_pack;

  @action async updateSell(amount, task) {
    super.update(product => {
      if (task._raw.unit === 'item') {
        product.amount_piece = product.amount_piece - amount;
      } else if (task._raw.unit === 'packet') {
        product.amount_pack = product.amount_pack - amount;
        if (product.category === 'tab1') {
          product.amount_piece = product.amount_piece - 20;
        }
      }
    });
    await this.subAction(() => task.deleteOnlyTasks());
  }

  @action async updateProduct(body) {
    await super.update(product => {
      product.name = body.productName;
      product.amount_piece = body.amountPieceField;
      product.amount_pack = body.amountPackField;
      product.buying_price_piece = body.buyingPricePiece;
      product.buying_price_pack = body.buyingPricePack;
      product.selling_price_piece = body.sellingPricePiece;
      product.selling_price_pack = body.sellingPricePack;
    });
  }

  @action async deleteProduct() {
    await super.destroyPermanently();
  }
}
