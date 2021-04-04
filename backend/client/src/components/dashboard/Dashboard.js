import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AdminDashboard from './AdminDashboard';
import UserComplaint from './userComplaint';
import SuperAdminDashboard from './SuperAdminDashboard';

const Dashboard = ({ auth: { user } }) => {

  return (
    <Fragment>
      <p className="lead m-3">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {user && user.role === 'admin' && <AdminDashboard />}
      {user && user.role === 'user' && <UserComplaint />}
      {user && user.role === 'superAdmin' && <SuperAdminDashboard />}

    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(
  Dashboard
);
