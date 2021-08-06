import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

const LoginPage: () => JSX.Element = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setIsAuthenticationDialogOpen } = useContext(UXContext);

  const { from }: any = location.state || { from: '/' };

  // If logged in, redirect away, otherwise
  // show authentication dialog on page load
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      setIsAuthenticationDialogOpen(true);
    }
  }, []);

  // redirect accordingly after a successful login
  useEffect(() => {
    console.log(location);
    console.log(from);
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

  return <h3 data-test="title-login-page">Login Page</h3>;
};

export default LoginPage;
