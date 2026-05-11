import React from 'react';
import ApiResourcePage from './ApiResourcePage';

function Activities() {
  return (
    <ApiResourcePage
      title="Activities"
      endpoint="activities"
      emptyMessage="No activities found from the REST API."
      fields={[
        { label: 'Name', keys: ['name', 'title'] },
        { label: 'User', keys: ['user', 'username', 'user_name'] },
        { label: 'Team', keys: ['team', 'team_name'] },
        { label: 'Duration', keys: ['duration', 'minutes'] },
      ]}
    />
  );
}

export default Activities;
