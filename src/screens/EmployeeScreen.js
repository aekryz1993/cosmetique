import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import TabsNavigation from '../screens/EmployeeScreens/NavigationTabs';
import employeeScreenStyle from '../stylesheets/layouts/employeeScreen';
import SumTotal from '../components/SumTotal';
import CurrentTasks from '../components/CurrentTasks';
import withObservables from '@nozbe/with-observables';

const EmployeeScreen = ({database, navigation, tasks}) => {
  const productCollection = database.collections.get('products');
  const tasksCollection = database.collections.get('tasks');

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };
  {
    /* <Button title="Logout" onPress={() => logout()} /> */
  }
  return (
    <View style={employeeScreenStyle.topContainer}>
      <View style={employeeScreenStyle.firstContainer}>
        <TabsNavigation
          productCollection={productCollection}
          database={database}
          tasksCollection={tasksCollection}
        />
        <Button title="Logout" onPress={() => logout()} /> 
      </View>
      <View style={employeeScreenStyle.secondContainer}>
        <SumTotal />
        <CurrentTasks tasksCollection={tasksCollection} />
      </View>
    </View>
  );
};

// const enhance = withObservables(['database'], ({database}) => ({
//   tasks: database.collections
//     .get('tasks')
//     .query()
//     .fetch(),
// }));

// const EnhancedEmployeeScreen = enhance(EmployeeScreen);

export default EmployeeScreen;
