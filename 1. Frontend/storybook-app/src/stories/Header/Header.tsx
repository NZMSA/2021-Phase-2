import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Avatar, fade, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import logo from "../assets/logos/msa_full_neg.svg"

import './header.css';
// Not sure if we are going to demonstrate both importing a css file and in component styling.
// Maybe leave both options? We can explain both.

// Header needs to know what user is logged in to render their name. If needed renders the image of their github.
// Here I have assumed that the image will be a URL.
export interface HeaderProps {
  user?: {
    firstName: String,
    lastName: String,
    image: String
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "#5c2d91",
      minHeight: "65px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userInformation: {
      display: 'flex',
      marginLeft: '20px'
    },
    flexEnd: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      display: 'flex',
    }
  }),
);

const CLIENT_ID = "memes";
const REDIRECT_URI = "http://localhost:3000/";

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <img src={logo} id="logo" width="200px" alt="MSA Logo" />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Microsoft Student Accelerator Project Submissions
          </Typography>
          <Hidden smDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          {user == null ?
            <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`} >
              <Button color="inherit">
                Login
              </Button>
            </a>
            :
            <div className={classes.userInformation}>
              <Avatar alt="user-avatar" src={`${user.image}`} />
              <Hidden smDown>
                <Button color="inherit">{`${user.firstName} ${user.lastName}`}</Button>
              </Hidden>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
