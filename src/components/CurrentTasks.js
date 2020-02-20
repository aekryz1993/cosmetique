import React from 'react';
import {View, ScrollView} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';

import currentTasksStyle from '../stylesheets/components/currentTasks.css';
import EnhancedTaskRow from './TaskRow';

const CurrentTasks = ({tasks, finances}) => {
  return (
    <View className={currentTasksStyle.container}>
      <ScrollView>
        {tasks.map(task => (
          <EnhancedTaskRow key={task.id} task={task} finances={finances} />
        ))}
      </ScrollView>
    </View>
  );
};

const enhance = withObservables(
  ['tasksCollection', 'financesCollection'],
  ({tasksCollection}) => {
    return {
      tasks: tasksCollection.query().observe(),
    };
  },
);

const EnhancedCurrentTasks = enhance(CurrentTasks);

export default EnhancedCurrentTasks;
