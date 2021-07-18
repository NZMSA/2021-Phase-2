import React from 'react';
import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    listText: {
        color: "black"
    },
    fullList: {
      width: 'auto',
    },
  });

// Custom Link composition component


export const SideBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.list}>
        <List>
            <ListItem button href="/home" component={Link}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText className={classes.listText} primary="Home" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button href="/settings" component={Link}>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText className={classes.listText} primary="Settings" />
            </ListItem>
            <ListItem button href="/logout" component={Link}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText className={classes.listText} primary="Logout" />
            </ListItem>
        </List>
      </div>
    )
}
