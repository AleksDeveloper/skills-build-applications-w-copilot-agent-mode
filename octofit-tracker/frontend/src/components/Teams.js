import React from 'react';
import ApiResourcePage from './ApiResourcePage';

function Teams() {
  return (
    <ApiResourcePage
      title="Teams"
      endpoint="teams"
      emptyMessage="No teams found from the REST API."
      fields={[
        { label: 'Name', keys: ['name', 'team_name'] },
        { label: 'Members', keys: ['members', 'member_count', 'users'] },
        { label: 'Captain', keys: ['captain', 'owner'] },
      ]}
    />
  );
}

export default Teams;
