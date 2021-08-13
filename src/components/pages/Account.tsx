import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UXContext, UXNotification } from '../../providers/UXProvider';
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

interface IAccountDetailsFormData {
  firstname: string;
  surname: string;
}

const AccountPage: () => JSX.Element = (): JSX.Element => {
  const classes = useStyles();

  const { setIsLoading, setNotification } = useContext(UXContext);

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
  } = useForm<IAccountDetailsFormData>();

  const saveHandler = async (data: IAccountDetailsFormData) => {
    const saveForm = (timeout: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    };

    console.log('data is: ', data);

    setIsLoading(true);

    await saveForm(2000);

    setIsLoading(false);

    const notification = new UXNotification();
    notification.message = 'Account details saved';

    setNotification(notification);
  };

  return (
    <Fragment>
      <h3 data-test="title-account-page">Account Details Page</h3>

      <Form
        preventNavigation={isDirty && !isSubmitSuccessful}
        onSubmit={handleSubmit(saveHandler)}
        className={classes.root}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <TextField
                type="text"
                label="First name"
                error={!!errors.firstname}
                helperText={errors.firstname ? 'Invalid first name' : ''}
                fullWidth
                variant="outlined"
                inputProps={{ 'data-test': 'firstname-input-field' }}
                {...register('firstname', { required: true })}
              />

              <TextField
                type="text"
                label="Surname"
                error={!!errors.surname}
                helperText={errors.surname ? 'Invalid surname name' : ''}
                fullWidth
                variant="outlined"
                inputProps={{ 'data-test': 'surname-input-field' }}
                {...register('surname', { required: true })}
              />

              <Button type="submit" variant="outlined" data-test="save-button">
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
