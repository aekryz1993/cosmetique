import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StatusBar} from 'react-native';

const AuthLoadingScreen = ({navigation}) => {
  useEffect(() => {
    _bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _bootstrapAsync = async () => {
    AsyncStorage.getItem('@user_token').then(userToken => {
      navigation.navigate(userToken ? 'App' : 'Auth');
    });
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
