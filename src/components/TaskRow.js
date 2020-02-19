import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import withObservables from '@nozbe/with-observables';

import currentTasksStyle from '../stylesheets/components/currentTasks.css';

const Task = ({task}) => (
  <View className={currentTasksStyle.taskRow}>
    <Text>{task.name}</Text>
    <Text>{task.category}</Text>
    <Text>{task.unit}</Text>
    <Text>{task.amount}</Text>
  </View>
);

const enhance = withObservables(['task'], ({task}) => ({
  task: task.observe(),
}));

const EnhancedTaskRow = enhance(Task);

export default EnhancedTaskRow;
