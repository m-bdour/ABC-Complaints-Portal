import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { useSpring, animated } from 'react-spring'


//images
import Logo from '../../assets/images/logo.png';

const Login = ({ login, isAuthenticated }) => {

  // animation
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };



  return (
    <section className="container center login-page" >
      <animated.div style={props}  >

        <div className="Login">
          <div className="center head text-primary">
            <img src={Logo} width='100px' alt="Logo" />
            <p>Complaint management portal </p>
            <p style={{ fontSize: "2rem" }} >Log in</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="Form-group">
              <label className='label' >Email</label>
              <input type="email" name='email' value={email} onChange={onChange} class="form-control" required placeholder="email@address.com" autoFocus />
            </div>
            <div className="Form-group">
              <label className='label' >Password</label>
              <input type="password" name='password' value={password} onChange={onChange} minLength='6' class="form-control" required placeholder="●●●●●●●●●●" />
            </div>
            <button type="submit" class="btn btn-primary">Log in</button>

            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>

          </form>
        </div>
      </animated.div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
