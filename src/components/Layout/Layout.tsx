import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './Layout.css';
import Account from '../pages/Account';
import Home from '../pages/Home';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container } from '@material-ui/core';
import { UXContext } from '../../providers/UXProvider';

const Layout: () => JSX.Element = (): JSX.Element => {
  const { isLoggedIn, isLoading } = useContext(UXContext);

  return (
    <Router>
      <NavBar />
      <SideMenu></SideMenu>
      <div style={{ height: '4px' }}>{isLoading && <LinearProgress color="secondary" />}</div>
      <Container maxWidth="md" className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          {isLoggedIn && <Route path="/private/account" component={Account} />}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default Layout;
