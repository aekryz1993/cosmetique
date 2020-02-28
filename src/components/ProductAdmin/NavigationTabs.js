import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import TabCategory from './TabCategory';
import {Q} from '@nozbe/watermelondb';

const TabsNavigation = ({
  productCollection,
  database,
  tasksCollection,
  financesCollection,
  usersCollection,
  navigation,
}) =>
  createMaterialTopTabNavigator(
    {
      Tabac: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab1'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Boisson: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab2'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Bonbons: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab3'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Chocolat: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab4'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Cosmétique: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab5'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Informatique: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab6'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Flexy: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab7'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab8: {
        screen: () => {
          const products = productCollection.query(Q.where('category', 'tab8'));
          return (
            <TabCategory
              navigation={navigation}
              usersCollection={usersCollection}
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
    },
    {
      initialRouteName: 'Tabac',
      tabBarOptions: {
        activeTintColor: '#222',
        scrollEnabled: true,
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          width: 114,
          height: 42,
        },
        style: {
          backgroundColor: '#537791',
        },
        indicatorStyle: {
          backgroundColor: '#111',
        },
      },
    },
  );

export default ({
  productCollection,
  database,
  tasksCollection,
  financesCollection,
  usersCollection,
  navigation,
}) => {
  const AppContainer = createAppContainer(
    TabsNavigation({
      productCollection,
      database,
      tasksCollection,
      financesCollection,
      usersCollection,
      navigation,
    }),
  );
  return <AppContainer />;
};
