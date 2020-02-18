import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'is_admin', type: 'boolean'},
      ],
    }),
    tableSchema({
      name: 'products',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'category', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'buying_price_piece', type: 'number'},
        {name: 'buying_price_pack', type: 'number'},
        {name: 'selling_price_piece', type: 'number'},
        {name: 'selling_price_pack', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'category', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'unit', type: 'string'},
      ],
    }),
  ],
});
