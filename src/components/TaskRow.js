import React from 'react';
import {View, Text} from 'react-native';
import withObservables from '@nozbe/with-observables';

import currentTasksStyle from '../stylesheets/components/currentTasks.css';

const Task = ({task, finances}) => {
  const deleteTask = () => {
    task.deleteTask(finances[0], task._raw.selling_price, task._raw.amount);
  };
  return (
    <View className={currentTasksStyle.taskRow}>
      <Text>{task.name}</Text>
      <Text>{task.category}</Text>
      <Text>{task.unit}</Text>
      <Text>{task.amount}</Text>
      <Text style={currentTasksStyle.delete} onPress={() => deleteTask()}>
        X
      </Text>
    </View>
  );
};

const enhance = withObservables(['task'], ({task}) => ({
  task: task.observe(),
}));

const EnhancedTaskRow = enhance(Task);

export default EnhancedTaskRow;
