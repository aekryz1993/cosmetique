/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import moment from 'moment';

import {mySchema} from './src/models/schema';
import User from './src/models/User';
import Product from './src/models/Product';
import AppNavigator from './src/screens/helpers/Navigation';
// import migrations from './src/models/migrations';
import Task from './src/models/Task.js';
import Finance from './src/models/Finance.js';
import {addFinance} from './src/seed/finance.js';

const adapter = new SQLiteAdapter({
  dbName: 'Cosmetique',
  schema: mySchema,
  // migrations,
});

const database = new Database({
  adapter,
  modelClasses: [User, Product, Task, Finance],
  actionsEnabled: true,
});

const createTodayFinance = () => {
  const today = moment(Date.now()).format('DD MMMM YYYY');
  addFinance(database, today);
};

const Navigation = AppNavigator({database, createTodayFinance});

AppRegistry.registerComponent(appName, () => Navigation);
