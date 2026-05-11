import React from 'react';
import ApiResourcePage from './ApiResourcePage';

function Workouts() {
  return (
    <ApiResourcePage
      title="Workouts"
      endpoint="workouts"
      emptyMessage="No workouts found from the REST API."
      fields={[
        { label: 'Name', keys: ['name', 'title'] },
        { label: 'Type', keys: ['type', 'category'] },
        { label: 'Duration', keys: ['duration', 'minutes'] },
        { label: 'Calories', keys: ['calories', 'calorie_burn'] },
      ]}
    />
  );
}

export default Workouts;
