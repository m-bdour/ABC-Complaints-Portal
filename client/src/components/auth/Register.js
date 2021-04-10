import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring'


//images
import Logo from '../../assets/images/logo.png';


const Register = ({ setAlert, register, isAuthenticated }) => {


  // animation
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if ((name.trimEnd()).length > 0) {
      register({ name, email, password });
    } else {
      setAlert('Name can\'t be empty', 'danger');
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="container center login-page" >
      <animated.div style={props}  >

        <div className="Login">

          <div className="center head text-primary">
            <img src={Logo} width='100px' alt="Logo" />
            <p>Complaint management portal </p>
            <p style={{ fontSize: "2rem" }} >Register</p>

          </div>
          <form onSubmit={onSubmit}>
            <div className="Form-group">
              <label className='label' >Name</label>
              <input type="text" name='name' value={name} onChange={onChange} class="form-control" placeholder="your name" autoFocus />
            </div>
            <div className="Form-group">
              <label className='label' >Email</label>
              <input type="text" name='email' value={email} onChange={onChange} class="form-control" placeholder="email@address.com" autoFocus />
            </div>
            <div className="Form-group">
              <label className='label' >Password</label>
              <input type="password" name='password' value={password} onChange={onChange} class="form-control" placeholder="●●●●●●●●●●" />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>

            <p>Already have an account? <Link to="/login">Sign In</Link></p>

          </form>
        </div>
      </animated.div>

    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
