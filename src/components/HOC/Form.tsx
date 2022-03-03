import React, { FormEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(5),
      },
      '& button': {
        minWidth: theme.spacing(10),
      },
      '& button:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
  }),
);

export interface IFormProps {
  children: ReactNode;
  className?: string;
  dataProps?: any;
  isValid: boolean;
  preventNavigation: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface IAlertDialog {
  isBlocking: boolean;
  isValid: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const AlertDialog: (props: IAlertDialog) => JSX.Element = (props: IAlertDialog): JSX.Element => {
  const classes = useStyles();

  const useCallbackPrompt = (when: boolean) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState<boolean>(false);
    const [lastLocation, setLastLocation] = useState<any>(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = () => {
      setShowPrompt(false);
    };

    const handleBlockedNavigation = useCallback(
      (nextLocation) => {
        if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
          setShowPrompt(true);
          setLastLocation(nextLocation);
          return false;
        }
        return true;
      },
      [confirmedNavigation],
    );

    const confirmNavigation = () => {
      setShowPrompt(false);
      setConfirmedNavigation(true);
    };

    const saveAndNavigate = async (e: any) => {
      setShowPrompt(false);

      // Even if the form is invalid, we want to call onSubmit in order to trigger validation
      // and display error messages.
      await props.onSubmit(e);

      if (props.isValid) {
        setConfirmedNavigation(true);
      }
    };

    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        navigate(lastLocation.location.pathname);
      }
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return { showPrompt, cancelNavigation, confirmNavigation, saveAndNavigate };
  };

  const obj = useCallbackPrompt(props.isBlocking);

  return (
    <Dialog open={obj.showPrompt}>
      <Grid justifyContent="center" container className={classes.container} data-test="unsaved-changes-modal">
        <Grid item>
          <Typography variant="h5">Unsaved Changes</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            You have unsaved data. Would you like to save it before continuing?
          </Typography>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            onClick={(e) => obj.saveAndNavigate(e)}
            color="primary"
            variant="contained"
            data-test="unsaved-data-yes-button"
          >
            Yes
          </Button>
          <Button
            onClick={obj.confirmNavigation}
            color="secondary"
            variant="contained"
            data-test="unsaved-data-no-button"
          >
            No
          </Button>
          <Button onClick={obj.cancelNavigation} variant="contained" data-test="unsaved-data-cancel-button">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

const Form: (props: IFormProps) => JSX.Element = (props: IFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit} className={props.className} noValidate autoComplete="off" {...props.dataProps}>
      <AlertDialog isBlocking={props.preventNavigation} isValid={props.isValid} onSubmit={props.onSubmit} />
      {props.children}
    </form>
  );
};

export default Form;
