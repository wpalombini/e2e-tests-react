import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

const LoginPage: () => JSX.Element = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  const { isLoggedIn, setIsAuthenticationDialogOpen } = useContext(UXContext);

  const { from }: any = location.state || { from: { pathname: '/' } };

  // If logged in, redirect away, otherwise
  // show authentication dialog on page load
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    } else {
      setIsAuthenticationDialogOpen(true);
    }
  }, []);

  // redirect accordingly after a successful login
  useEffect(() => {
    if (isLoggedIn) {
      history.replace(from);
    }
  }, [isLoggedIn]);

  return <h3 data-test="title-login-page">Login Page</h3>;
};

export default LoginPage;
