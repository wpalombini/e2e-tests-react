import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './Layout.css';
import AccountPage from '../pages/Account';
import HomePage from '../pages/Home';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { UXContext } from '../../providers/UXProvider';
import LoginPage from '../pages/Login';
import PrivateRoute from '../HOC/PrivateRoute';
import About from '../pages/About';
import AuthenticationDialog from '../Dialogs/AuthenticationDialog';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Layout: () => JSX.Element = (): JSX.Element => {
  const { isAuthenticationDialogOpen, isLoading, notification, setNotification } = useContext(UXContext);

  return (
    <Router>
      <NavBar />
      <SideMenu />
      <div style={{ height: '4px' }}>{isLoading && <LinearProgress color="secondary" data-test="loading-bar" />}</div>
      <Snackbar open={notification !== null} autoHideDuration={5000} onClose={() => setNotification(null)}>
        {notification ? (
          <Alert onClose={() => setNotification(null)} severity={notification.type} data-test="alert">
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
      <Container maxWidth="md" className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/private/account">
            <AccountPage />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
      <AuthenticationDialog isOpen={isAuthenticationDialogOpen} />
    </Router>
  );
};

export default Layout;
