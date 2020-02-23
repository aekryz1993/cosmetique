import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AuthLoadingScreen from './AuthLoadingScreen';
import HomeScreen from '../HomeScreen';
import AdminScreen from '../AdminScreen';
import EnhancedEmployeeScreen from '../EmployeeScreen';
import AppLoadingScreen from './AppLoadingScreen';

const AppStack = props =>
  createStackNavigator(
    {
      AppLoading: {
        screen: ({navigation}) => {
          const {database} = navigation.state.params;
          return (
            <AppLoadingScreen database={database} navigation={navigation} />
          );
        },
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
      Admin: {
        screen: ({navigation}) => {
          const {database} = navigation.state.params;
          const usersCollection = database.collections.get('users');
          return (
            <AdminScreen
              navigation={navigation}
              usersCollection={usersCollection}
            />
          );
        },
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
      Employee: {
        screen: ({navigation}) => {
          const {database} = navigation.state.params;
          return (
            <EnhancedEmployeeScreen
              database={database}
              navigation={navigation}
            />
          );
        },
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: 'AppLoading',
      initialRouteParams: props,
    },
  );

const AuthStack = props =>
  createStackNavigator(
    {
      Home: {
        screen: ({navigation}) => {
          const {database} = navigation.state.params;
          return <HomeScreen database={database} navigation={navigation} />;
        },
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteParams: props,
    },
  );

const SwitchNavigation = props =>
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: ({navigation}) => {
          const {createTodayFinance} = navigation.state.params;
          createTodayFinance();
          return <AuthLoadingScreen navigation={navigation} />;
        },
        navigationOptions: () => ({
          headerShown: false,
        }),
      },
      // AuthLoading: AuthLoadingScreen,
      App: AppStack(props),
      Auth: AuthStack(props),
    },
    {
      initialRouteName: 'AuthLoading',
      initialRouteParams: props,
    },
  );

export default props => createAppContainer(SwitchNavigation(props));
