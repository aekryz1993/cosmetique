import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import TabsNavigation from '../screens/EmployeeScreens/NavigationTabs';
import employeeScreenStyle from '../stylesheets/layouts/employeeScreen';
import OperationsGain from '../components/OperationsGain';

const EmployeeScreen = ({database, navigation}) => {
  const productCollection = database.collections.get('products');
  const tasksCollection = database.collections.get('tasks');
  const financesCollection = database.collections.get('finances');
  const today = moment(Date.now()).format('DD MMMM YYYY');

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  return (
    <View style={employeeScreenStyle.topContainer}>
      <View style={employeeScreenStyle.firstContainer}>
        <TabsNavigation
          productCollection={productCollection}
          database={database}
          tasksCollection={tasksCollection}
          financesCollection={financesCollection}
        />
        <Button title="Logout" onPress={() => logout()} />
      </View>
      <OperationsGain
        employeeScreenStyle={employeeScreenStyle}
        financesCollection={financesCollection}
        tasksCollection={tasksCollection}
        today={today}
      />
    </View>
  );
};

export default EmployeeScreen;
