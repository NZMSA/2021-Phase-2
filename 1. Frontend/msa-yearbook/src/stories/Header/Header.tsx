import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { SideBar } from "../Sidebar/Sidebar";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logos/msa_full_neg.svg";

// Not sure if we are going to demonstrate both importing a css file and in component styling.
// Maybe leave both options? We can explain both.

// Header needs to know what user is logged in to render their name. If needed renders the image of their github.
// Here I have assumed that the image will be a URL.
export interface HeaderProps {
  user?: {
    firstName: String;
    lastName: String;
    image: String;
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
      minHeight: "65px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: "10px",
    },
    inputRoot: {
      color: "inherit",
    },
    userInformation: {
      display: "flex",
      marginLeft: "20px",
    },
    flexEnd: {
      justifyContent: "flex-end",
      alignItems: "center",
      display: "flex",
    },
  })
);

const CLIENT_ID = "memes";
const REDIRECT_URI = "http://localhost:3000/";

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const classes = useStyles();
  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSideBar}
          >
            <MenuIcon />
            <Drawer anchor="left" open={sideBar} onClose={toggleSideBar}>
              <SideBar />
            </Drawer>
          </IconButton>
          <IconButton href="https://nzmsa.netlify.app/">
            <img src={logo} id="logo" width="200px" alt="MSA Logo" />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Microsoft Student Accelerator Project Submissions
          </Typography>
          {user == null ? (
            <Button
              color="inherit"
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </Button>
          ) : (
            <div className={classes.userInformation}>
              <Avatar alt="user-avatar" src={`${user.image}`} />
              <Hidden smDown>
                <Button color="inherit">{`${user.firstName} ${user.lastName}`}</Button>
              </Hidden>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
