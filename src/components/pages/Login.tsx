import { Button } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

const LoginPage: () => JSX.Element = (): JSX.Element => {
  const { setIsLoggedIn } = useContext(UXContext);
  const history = useHistory();
  const location = useLocation();

  const { from }: any = location.state || { from: { pathname: '/' } };

  const handleLogin: () => void = (): void => {
    setIsLoggedIn(true);

    history.replace(from);
  };

  return (
    <Fragment>
      <h3>Login Page</h3>
      <Button onClick={handleLogin} color="inherit" variant="outlined">
        Login
      </Button>
    </Fragment>
  );
};

export default LoginPage;
