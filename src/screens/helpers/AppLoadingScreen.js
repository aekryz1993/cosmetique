import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StatusBar} from 'react-native';

const AppLoadingScreen = ({navigation, database}) => {
  useEffect(() => {
    _bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _bootstrapAsync = () => {
    // const userToken = await AsyncStorage.getItem('@screen_token');
    // console.log(userToken);
    AsyncStorage.getItem('@screen_token').then(userToken => {
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
