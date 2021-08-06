import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar: () => JSX.Element = (): JSX.Element => {
  const classes = useStyles();

  const { isSideMenuOpen, setIsSideMenuOpen, isLoggedIn, setIsLoggedIn, setIsAuthenticationDialogOpen } =
    useContext(UXContext);
  const navigate = useNavigate();

  const handleAuth: () => void = (): void => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/', { replace: true });
    } else {
      setIsAuthenticationDialogOpen(true);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            data-test="side-menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">e2e Tests App</Link>
          </Typography>
          <Button onClick={handleAuth} color="inherit" variant="outlined" data-test="navbar-login-button">
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
