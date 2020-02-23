import {
  schemaMigrations,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'tasks',
          columns: [
            {name: 'name', type: 'string'},
            {name: 'category', type: 'string'},
            {name: 'amount', type: 'number'},
            {name: 'unit', type: 'string'},
            {name: 'buying_price', type: 'number'},
            {name: 'selling_price', type: 'number'},
            {name: 'exception', type: 'number'},
          ],
        }),
      ],
    },
  ],
});
