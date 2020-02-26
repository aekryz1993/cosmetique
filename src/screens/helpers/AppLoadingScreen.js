import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StatusBar} from 'react-native';

const AppLoadingScreen = ({navigation, database}) => {
  useEffect(() => {
    _bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _bootstrapAsync = () => {
    const userTokenf = userToken => {
      if (userToken === 'admin') {
        return 'Admin';
      }
      if (userToken === 'employee') {
        return 'Employee';
      }
    };
    AsyncStorage.getItem('@screen_token').then(userToken => {
      if (userToken) {
        navigation.navigate(userTokenf(userToken), {
          database: database,
        });
      } else {
        navigation.push('Home', {
          database: database,
        });
      }
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
