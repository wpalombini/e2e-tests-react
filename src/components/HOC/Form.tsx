import React, { FormEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface IFormProps {
  children: ReactNode;
  className?: string;
  preventNavigation: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface IAlertDialog {
  isBlocking: boolean;
}

const AlertDialog: (props: IAlertDialog) => JSX.Element = (props: IAlertDialog): JSX.Element => {
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

    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        navigate(lastLocation.location.pathname);
      }
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return { showPrompt, cancelNavigation, confirmNavigation };
  };

  const obj = useCallbackPrompt(props.isBlocking);

  return (
    <Dialog open={obj.showPrompt}>
      <DialogTitle id="alert-dialog-title">{'Unsaved Changes'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have unsaved data. If you continue you will loose it. Continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={obj.confirmNavigation} variant="outlined">
          Yes
        </Button>
        <Button onClick={obj.cancelNavigation} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Form: (props: IFormProps) => JSX.Element = (props: IFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit} className={props.className} noValidate autoComplete="off">
      <AlertDialog isBlocking={props.preventNavigation} />
      {props.children}
    </form>
  );
};

export default Form;
