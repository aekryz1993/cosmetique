import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import moment from 'moment';

import {addFinance} from '../../seed/finance';

const AppLoadingScreen = ({navigation, database}) => {
  const today = moment(Date.now()).format('DD MMMM YYYY');
  const financesCollection = database.collections.get('finances');

  useEffect(() => {
    _bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _bootstrapAsync = () => {
    // const userToken = await AsyncStorage.getItem('@screen_token');
    // console.log(userToken);
    AsyncStorage.getItem('@screen_token').then(userToken => {
      addFinance(database, financesCollection, today);
      navigation.navigate(userToken === 'admin' ? 'Admin' : 'Employee', {
        database: database,
      });
    });
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AppLoadingScreen;
