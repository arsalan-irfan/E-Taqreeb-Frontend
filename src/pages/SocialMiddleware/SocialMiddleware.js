import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SocialLogin } from '../../actions/auth';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';


const SocialMiddleware = ({ SocialLogin, isAuthenticated }) => {
  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      const token = Cookies.get('auth');
      // SocialLogin();
      Cookies.remove('auth');
      localStorage.setItem('token', token);
      // loadToken(token);
    }
    SocialLogin();
  }, []);
  //   if (isAuthenticated) {
  //     return <Redirect to='/user/home' />;
  //   }
  return (
    <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  );
};

SocialMiddleware.propTypes = {
  SocialLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { SocialLogin })(SocialMiddleware);