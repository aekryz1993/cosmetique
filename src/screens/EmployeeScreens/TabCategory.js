import React from 'react';
import {View, FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import moment from 'moment';
import {Q} from '@nozbe/watermelondb';

import tabCategoryStyle from '../../stylesheets/layouts/tabCategory.css';
import cardStyle from '../../stylesheets/components/card.css';
import Card from '../../components/Card';

const TabCategory = ({
  products,
  database,
  tasksCollection,
  financesCollection,
}) => {
  const today = moment(Date.now()).format('DD MMMM YYYY');
  const fetchTasks = async () => {
    const tasks = await tasksCollection.query().fetch();
    return tasks;
  };

  return (
    <View style={tabCategoryStyle.container}>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Card
            cardStyle={cardStyle}
            product={item}
            tasks={fetchTasks()}
            financesCollection={financesCollection}
            database={database}
            today={today}
          />
        )}
        numColumns={3}
      />
    </View>
  );
};

const enhance = withObservables(['products'], ({products}) => ({
  products,
}));

const EnhancedTabCategory = enhance(TabCategory);

export default EnhancedTabCategory;
