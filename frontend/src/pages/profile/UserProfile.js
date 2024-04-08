import React from 'react';
import { connect } from 'react-redux';
import Cover from './Cover';
import UserInfo from './UserInfo';
import Won from '../home/won';

const UserProfile = ({ user }) => {
  console.log('user', user);
  if (!user) {
    // Handle the case where the user object is null or undefined
    return <div>Loading...</div>; // You can customize this message or component as needed
  }

  return (
    <React.Fragment>
      <Cover />
      <UserInfo
        userID={user.id}
        userName={user.name}
      />
      <Won
        userID={user.id}
        userName={user.name} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
