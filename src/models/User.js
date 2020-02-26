import {Model, Q} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

import {checkPassword} from './helpers/auth';

export default class User extends Model {
  static table = 'users';

  @field('username')
  username;

  @field('password')
  password;

  @field('is_admin')
  isAdmin;

  @action async addUser(body) {
    const userExist = await this.query(
      Q.where('username', body.username),
    ).fetch();

    if (userExist) {
      return;
    }
    return await this.create(user => {
      user.username = body.username;
      user.password = body.password;
      user.isAdmin = body.isAdmin;
    });
  }

  @action checkAuthPassword(guess, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const checkedPassword = await checkPassword(guess, user.password);
        checkedPassword ? resolve(true) : resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  @action async checkAdmin(user) {
    return new Promise((resolve, reject) => {
      user.is_admin ? resolve(true) : resolve(false);
    });
  }

  @action async addProduct(body) {
    try {
      if (!body.productName) {
        console.log('Entrez le nom de produit');
        return;
      }
      const productsCollection = this.collections.get('products');

      const existProduct = await productsCollection
        .query(Q.where('name', body.productName))
        .fetch();

      if (existProduct.length !== 0) {
        console.log('Product already exist');
        return;
      }

      const newProduct = await productsCollection.create(product => {
        product.name = body.productName;
        product.category = body.category;
        product.amount_piece = Number(body.amountPieceField);
        product.amount_pack = Number(body.amountPackField);
        product.buying_price_piece = Number(body.buyingPricePiece);
        product.buying_price_pack = Number(body.buyingPricePack);
        product.selling_price_piece = Number(body.sellingPricePiece);
        product.selling_price_pack = Number(body.sellingPricePack);
      });

      if (newProduct) {
        console.log('Product successfully added');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
