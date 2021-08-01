import { Button, Dialog, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';

export interface IAuthenticationDialogProps {
  isOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(5),
      },
    },
    paper: {
      padding: theme.spacing(3),
    },
  }),
);

const LoginDialog: (props: IAuthenticationDialogProps) => JSX.Element = (
  props: IAuthenticationDialogProps,
): JSX.Element => {
  const classes = useStyles();

  const { setIsLoggedIn, setIsLoading, setNotification, setIsAuthenticationDialogOpen } = useContext(UXContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reset email and password fields every time we open this dialog.
  // I could reset these fields in the handleOnClose method, however
  // we can see the fields being cleared before the dialog disappears,
  // so better reset it when opening it.
  useEffect(() => {
    if (props.isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [props.isOpen]);

  const handleLogin: () => void = (): void => {
    setIsLoading(true);

    setTimeout(() => {
      const credentialsAreValid: boolean = email === 'test@test.com' && password === 'test';

      setIsLoading(false);

      const notification = new UXNotification();
      if (credentialsAreValid) {
        notification.message = 'You are now logged in';

        setIsAuthenticationDialogOpen(false);
      } else {
        notification.message = 'Invalid email or password';
        notification.type = NotificationType.Error;
      }

      setNotification(notification);

      setIsLoggedIn(credentialsAreValid);
    }, 2000);
  };

  const handleOnClose: () => void = (): void => {
    setIsAuthenticationDialogOpen(false);
  };

  return (
    <Dialog onClose={handleOnClose} open={props.isOpen}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container>
          <Grid item>
            <Grid container>
              <Grid item>
                <Paper className={classes.paper}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    inputProps={{ 'data-test': 'email-input-field' }}
                  />
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    inputProps={{ 'data-test': 'password-input-field' }}
                  />
                  <Button onClick={handleLogin} variant="outlined" data-test="login-button">
                    Login
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default LoginDialog;
