import React from 'react';
import {View, Text, FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';

import tabCategoryStyle from '../../stylesheets/layouts/tabCategory.css';
import cardStyle from '../../stylesheets/components/card.css';
import Card from '../../components/Card';

const TabCategory = ({products, database, tasksCollection}) => {
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
            database={database}
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
