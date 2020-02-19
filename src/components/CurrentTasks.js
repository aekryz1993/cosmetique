import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import withObservables from '@nozbe/with-observables';

import currentTasksStyle from '../stylesheets/components/currentTasks.css';
import EnhancedTaskRow from './TaskRow';

const CurrentTasks = ({tasks}) => {
  return (
    <View className={currentTasksStyle.container}>
      <ScrollView>
        {tasks.map((task, index) => (
          <EnhancedTaskRow key={task.id} task={task} />
        ))}
      </ScrollView>
    </View>
  );
};

const enhance = withObservables(['tasksCollection'], ({tasksCollection}) => ({
  tasks: tasksCollection.query().observe(),
}));

const EnhancedCurrentTasks = enhance(CurrentTasks);

export default EnhancedCurrentTasks;
