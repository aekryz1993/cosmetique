/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './src/models/schema';
import User from './src/models/User';
import Product from './src/models/Product';
import AppNavigator from './src/screens/helpers/Navigation';
// import AppNavigator from './App';
import Task from './src/models/Task.js';

const adapter = new SQLiteAdapter({
  dbName: 'Cosmetique',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [User, Product, Task],
  actionsEnabled: true,
});

const Navigation = AppNavigator({database});

AppRegistry.registerComponent(appName, () => Navigation);
