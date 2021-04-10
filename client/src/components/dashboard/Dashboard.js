import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring'


// Components
import AdminDashboard from './AdminDashboard';
import UserComplaint from './userComplaint';
import SuperAdminDashboard from './SuperAdminDashboard';

const Dashboard = ({ auth: { user } }) => {

  // animation
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: { duration: 1000 } });


  return (
    <Fragment>
      <animated.div style={props}  >

        <p className="lead m-3">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
      </animated.div>

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
