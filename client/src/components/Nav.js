import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';


import Logo from '../assets/images/logo.png';


const Nav = ({ auth: { isAuthenticated }, logout }) => {


    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light " style={{ justifyContent: 'space-between' }}>
                <Link className="nav-link" to="/">
                    <img src={Logo} width='40' alt="Logo" />
                </Link>
                {isAuthenticated ?
                    <a onClick={logout} href="/" className='center' >
                        <i className="fas fa-sign-out-alt" />{' '}
                        <span className="hide-sm">Logout</span>
                    </a> : null}
            </nav>
        </header>
    )
}

Nav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Nav);
