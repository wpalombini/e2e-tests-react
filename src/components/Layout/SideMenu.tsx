import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UXContext } from '../../providers/UXProvider';
import { House, Info } from '@material-ui/icons';

export interface IListItem {
  title: string;
  url: string;
  icon: JSX.Element;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  a: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  header: {
    paddingLeft: 24,
  },
});

const SideMenu: () => JSX.Element = (): JSX.Element => {
  const classes = useStyles();

  const defaultMenuItems = [
    {
      title: 'Home',
      url: '/',
      icon: <House />,
    },
  ];
  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  const { isLoggedIn, isSideMenuOpen, setIsSideMenuOpen } = useContext(UXContext);

  useEffect(() => {
    const currentMenuItems = [...defaultMenuItems];
    if (isLoggedIn) {
      const menuItem = { title: 'Account Settings', url: '/private/account', icon: <Info /> };
      currentMenuItems.splice(1, 0, menuItem);
    }

    setMenuItems(currentMenuItems);
  }, [isLoggedIn]);

  const toggleSideMenu: () => (event: React.KeyboardEvent | React.MouseEvent) => void =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsSideMenuOpen(!isSideMenuOpen);
    };

  return (
    <Drawer anchor="left" open={isSideMenuOpen} onClose={toggleSideMenu()}>
      <div className={classes.header}>
        <h3>e2e Tests App</h3>
      </div>

      <Divider />
      <div className={classes.list} role="presentation" onClick={toggleSideMenu()} onKeyDown={toggleSideMenu()}>
        <List>
          {menuItems.map(
            (listItem: IListItem, index: number): JSX.Element => (
              <Link className={classes.a} to={listItem.url} key={index}>
                <ListItem button>
                  <ListItemIcon>{listItem.icon}</ListItemIcon>
                  <ListItemText primary={listItem.title} />
                </ListItem>
              </Link>
            ),
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
