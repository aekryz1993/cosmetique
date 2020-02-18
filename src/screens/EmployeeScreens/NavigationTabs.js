import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import TabCategory from './TabCategory';
import {Q} from '@nozbe/watermelondb';

const TabsNavigation = ({productCollection, database}) =>
  createMaterialTopTabNavigator(
    {
      Tab1: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab1'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab2: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab2'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab3: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab3'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab4: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab4'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab5: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab5'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab6: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab6'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab7: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab7'))
            .fetch();
          return <TabCategory products={products} database={database} />;
        },
      },
      Tab8: {
        screen: () => {
          const products = productCollection
            .query(Q.where('category', 'tab8'))
            .fetch();
          return <TabCategory products={products} database={database} />;
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

export default ({productCollection, database}) => {
  const AppContainer = createAppContainer(
    TabsNavigation({productCollection, database}),
  );
  return <AppContainer />;
};
