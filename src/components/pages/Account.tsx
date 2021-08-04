import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { FormEvent, Fragment, useContext } from 'react';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';
import Form from '../HOC/Form';

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

const AccountPage: () => JSX.Element = (): JSX.Element => {
  const classes = useStyles();

  const { setIsLoading, setNotification } = useContext(UXContext);

  const handleSave: (e: FormEvent) => void = (e: FormEvent): void => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const notification = new UXNotification();
      notification.message = 'Account details saved';

      // if (credentialsAreValid) {
      //   notification.message = 'Account details saved';

      // } else {
      //   notification.message = 'An error occured saving account details';
      //   notification.type = NotificationType.Error;
      // }

      setNotification(notification);
    }, 2000);
  };

  return (
    <Fragment>
      <h3 data-test="title-account-page">Account Details Page</h3>
      <Form onSubmit={(e) => handleSave(e)} className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <TextField
                type="text"
                label="First name"
                autoFocus={true}
                fullWidth
                variant="outlined"
                inputProps={{ 'data-test': 'firstname-input-field' }}
              />
              <TextField
                type="text"
                label="Surname"
                fullWidth
                variant="outlined"
                inputProps={{ 'data-test': 'surname-input-field' }}
              />
              <Button onClick={handleSave} type="submit" variant="outlined" data-test="save-button">
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default AccountPage;
