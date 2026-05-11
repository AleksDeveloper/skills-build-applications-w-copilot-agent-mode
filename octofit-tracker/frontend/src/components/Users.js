import React from 'react';
import ApiResourcePage from './ApiResourcePage';

function Users() {
  return (
    <ApiResourcePage
      title="Users"
      endpoint="users"
      emptyMessage="No users found from the REST API."
      fields={[
        { label: 'Username', keys: ['username', 'name'] },
        { label: 'Email', keys: ['email'] },
        { label: 'First Name', keys: ['first_name', 'firstName'] },
        { label: 'Last Name', keys: ['last_name', 'lastName'] },
      ]}
    />
  );
}

export default Users;
