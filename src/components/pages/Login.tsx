import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(5),
      },
    },
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

const LoginPage: () => JSX.Element = (): JSX.Element => {
  const classes = useStyles();
  const { setIsLoggedIn, setIsLoading, setNotification } = useContext(UXContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();

  const { from }: any = location.state || { from: { pathname: '/' } };

  const handleLogin: () => void = (): void => {
    setIsLoading(true);

    setTimeout(() => {
      const credentialsAreValid: boolean = email === 'test@test.com' && password === 'test';

      setIsLoading(false);

      setIsLoggedIn(credentialsAreValid);

      const notification = new UXNotification();
      if (credentialsAreValid) {
        notification.message = 'You are now logged in';
      } else {
        notification.message = 'Invalid email or password';
        notification.type = NotificationType.Error;
      }

      setNotification(notification);

      if (credentialsAreValid) {
        history.replace(from);
      }
    }, 2000);
  };

  return (
    <Fragment>
      <h3>Login Page</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    label="Email"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    label="Password"
                    fullWidth
                    variant="outlined"
                  />
                  <Button onClick={handleLogin} variant="outlined">
                    Login
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default LoginPage;
