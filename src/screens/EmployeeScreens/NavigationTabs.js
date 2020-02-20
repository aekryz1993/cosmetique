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
}) =>
  createMaterialTopTabNavigator(
    {
      Tab1: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab1'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab2: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab2'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab3: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab3'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab4: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab4'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab5: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab5'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab6: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab6'))
            .fetch();
          return (
            <TabCategory
              products={products}
              database={database}
              tasksCollection={tasksCollection}
              financesCollection={financesCollection}
            />
          );
        },
      },
      Tab7: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab7'))
            .fetch();
          return (
            <TabCategory
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
          const products = productCollection
            .query(Q.where('category', 'tab8'))
            .fetch();
          return (
            <TabCategory
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
      initialRouteName: 'Tab1',
      tabBarOptions: {
        activeTintColor: '#222',
        scrollEnabled: true,
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          width: 90,
          height: 42,
        },
        style: {
          backgroundColor: 'green',
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
}) => {
  const AppContainer = createAppContainer(
    TabsNavigation({
      productCollection,
      database,
      tasksCollection,
      financesCollection,
    }),
  );
  return <AppContainer />;
};
