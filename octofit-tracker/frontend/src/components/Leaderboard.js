import React from 'react';
import ApiResourcePage from './ApiResourcePage';

function Leaderboard() {
  return (
    <ApiResourcePage
      title="Leaderboard"
      endpoint="leaderboard"
      emptyMessage="No leaderboard entries found from the REST API."
      fields={[
        { label: 'Name', keys: ['name', 'user', 'username'] },
        { label: 'Team', keys: ['team', 'team_name'] },
        { label: 'Score', keys: ['score', 'points', 'total'] },
      ]}
    />
  );
}

export default Leaderboard;
