import React from 'react';
import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { HeaderProps } from '../Header/Header';

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

const CLIENT_ID = "a6ac879139cfdf60af2a";
const REDIRECT_URI = "http://localhost:3000/home";

export const SideBar: React.FC<HeaderProps> = ({ user }) => {
  const classes = useStyles();
  const handleLogout = () => {
    localStorage.removeItem("token");
  }
  return (
    <div className={classes.list}>
      <List>
        <ListItem button href="/" component={Link}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText className={classes.listText} primary="Home" />
        </ListItem>
        <ListItem button href="/submit" component={Link}>
          <ListItemIcon><ArrowUpwardIcon /></ListItemIcon>
          <ListItemText className={classes.listText} primary="Submit" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user ?
          <ListItem button href="/home" component={Link} onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText className={classes.listText} primary="Logout" />
          </ListItem> :
          <ListItem button href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`} component={Link}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText className={classes.listText} primary="Login" />
          </ListItem>

        }
      </List>
    </div>
  )
}
