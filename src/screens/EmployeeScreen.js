import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import TabsNavigation from '../screens/EmployeeScreens/NavigationTabs';
import employeeScreenStyle from '../stylesheets/layouts/employeeScreen';

const EmployeeScreen = ({database, navigation}) => {
  const productCollection = database.collections.get('products');

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  return (
    <View style={employeeScreenStyle.topContainer}>
      <Button title="Logout" onPress={() => logout()} />
      <View style={employeeScreenStyle.firstContainer}>
        <TabsNavigation
          productCollection={productCollection}
          database={database}
        />
      </View>
      <View style={employeeScreenStyle.secondContainer} />
    </View>
  );
};

export default EmployeeScreen;
