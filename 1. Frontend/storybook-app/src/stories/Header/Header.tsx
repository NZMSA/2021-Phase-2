import React, { useState, useEffect } from "react";
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
import logo from "../assets/logos/msa_full_neg.svg";
import { FETCH_TOKEN, useFetchToken } from "../../GraphQLClient";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
      marginRight: "200px",
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

const CLIENT_ID = "a6ac879139cfdf60af2a";
const REDIRECT_URI = "http://localhost:3000/home";

export interface Login_login_student {
  __typename: "Student";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface Login_login {
  __typename: "LoginPayload";
  student: Login_login_student;
  jwt: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  code: string;
}
export const Header: React.FC<HeaderProps> = ({ user }) => {
  const history = useHistory()
  const classes = useStyles();
  const [sideBar, setSideBar] = useState(false);

  const query = useQuery();

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  const [login] = useMutation<Login>(FETCH_TOKEN);

  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");

      if (code != null) {
        console.log(code)
        try {
          const {data} = await login({ variables: { code } });
          if (data != null ){
            localStorage.setItem("token", data.login.jwt)
          }
        } catch (e) {
          console.log(e);
        }
        history.push('/home')
      }
    };
    loginMethod();
  }, []);

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
