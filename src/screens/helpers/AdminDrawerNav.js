import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import Product from '../../components/ProductAdmin/Product';
import User from '../../components/UsersAdmin/User';

const NavigationDrawerStructure = ({navigationProps}) => {
  const toggleDrawer = () => {
    navigationProps.toggleDrawer();
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require('../../../public/images/drawer.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const Disconnect = ({navigationProps}) => {
  const toggleDrawer = async () => {
    await AsyncStorage.removeItem('@user_token');
    await AsyncStorage.removeItem('@screen_token');
    navigationProps.push('Home', {
      database: navigationProps.state.params.database,
    });
    // console.log(navigationProps.state.params);
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require('../../../public/images/drawer.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const UserStackNavigator = ({navigation}) =>
  createStackNavigator(
    {
      //All the screen from the Screen1 will be indexed here
      First: {
        screen: () => {
          // const {database} = navigation.state.params;
          return <User navigation={navigation} />;
        },
        navigationOptions: () => ({
          title: 'User',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => {
            // const {database} = navigation.state.params;
            return <Disconnect navigationProps={navigation} />;
          },
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
        }),
      },
    },
    // {
    //   initialRouteParams: props,
    // },
  );

const ProductStackNavigator = ({navigation}) =>
  createStackNavigator(
    {
      Second: {
        screen: () => {
          // const {database} = navigation.state.params;
          return <Product navigation={navigation} />;
        },
        navigationOptions: () => ({
          title: 'Product',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => {
            // const {database} = navigation.state.params;
            return <Disconnect navigationProps={navigation} />;
          },
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
        }),
      },
    },
    // {
    //   initialRouteParams: props,
    // },
  );

const DrawerNavigator = props =>
  createDrawerNavigator(
    {
      //Drawer Optons and indexing
      Screen1: {
        //Title
        screen: UserStackNavigator(props),
        navigationOptions: {
          drawerLabel: 'User',
        },
      },
      Screen2: {
        //Title
        screen: ProductStackNavigator(props),
        navigationOptions: {
          drawerLabel: 'Product',
        },
      },
    },
    {
      drawerType: 'back',
    },
  );

export default props => {
  const AdminDrawserNav = createAppContainer(DrawerNavigator(props));
  return <AdminDrawserNav />;
};
