import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';

import SumTotal from './SumTotal';
import EnhancedCurrentTasks from './CurrentTasks';

const OperationsGain = ({
  employeeScreenStyle,
  tasksCollection,
  finances,
  today,
}) => {
  return (
    <View style={employeeScreenStyle.secondContainer}>
      <SumTotal finances={finances} today={today} />
      <EnhancedCurrentTasks
        tasksCollection={tasksCollection}
        finances={finances}
        today={today}
      />
    </View>
  );
};

const enhance = withObservables(
  ['financesCollection'],
  ({today, financesCollection}) => {
    return {
      finances: financesCollection.query(Q.where('date', today)).fetch(),
    };
  },
);

const EnhancedCard = enhance(OperationsGain);

export default EnhancedCard;
