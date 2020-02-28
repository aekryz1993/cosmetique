import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

import Product from '../../components/ProductAdmin/Product';
import User from '../../components/UsersAdmin/User';
import btnStyle from '../../stylesheets/elements/button.css';

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
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flexDirection: 'row'}}>
      {/* <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require('../../../public/images/logout.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity> */}
      <Button
        style={btnStyle.logoutBtn}
        icon={require('../../../public/images/logout.png')}
        mode="contained"
        onPress={toggleDrawer}>
        Logout
      </Button>
    </View>
  );
};

const UserStackNavigator = ({navigationProps}) =>
  createStackNavigator({
    First: {
      screen: () => {
        return <User navigation={navigationProps} />;
      },
      navigationOptions: ({navigation}) => ({
        title: 'User',
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => {
          return <Disconnect navigationProps={navigationProps} />;
        },
        headerStyle: {
          backgroundColor: '#537791',
          height: 45,
        },
        headerTintColor: '#fff',
      }),
    },
  });

const ProductStackNavigator = ({navigationProps}) =>
  createStackNavigator({
    Second: {
      screen: () => {
        const {database} = navigationProps.state.params;
        return <Product navigation={navigationProps} database={database} />;
      },
      navigationOptions: ({navigation}) => ({
        title: 'Product',
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => {
          return <Disconnect navigationProps={navigationProps} />;
        },
        headerTitleAllowFontScaling: true,
        headerStyle: {
          backgroundColor: '#537791',
          height: 45,
        },
        headerTintColor: '#fff',
      }),
    },
  });

const DrawerNavigator = props =>
  createDrawerNavigator(
    {
      Screen1: {
        screen: UserStackNavigator(props),
        navigationOptions: {
          drawerLabel: 'User',
        },
      },
      Screen2: {
        screen: ProductStackNavigator(props),
        navigationOptions: {
          drawerLabel: 'Product',
        },
      },
    },
    {
      drawerType: 'back',
      initialRouteName: 'Screen2',
    },
  );

export default props => {
  const AdminDrawserNav = createAppContainer(DrawerNavigator(props));
  return <AdminDrawserNav />;
};
