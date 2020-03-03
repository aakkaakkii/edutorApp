import React from 'react';
import {BrowserRouter, Link, Route, Switch, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import EditorPage from "./components/EditorPage";
import SupportPage from "./components/SupportPage";
import UserManager from "./components/UserManager";
import AuthenticatedComponent from "./components/security/AuthenticatedComponent";
import Login from "./components/security/Login";
import Home from "./components/Home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logout from "./components/security/Logout";
import UserLog from "./components/UserLog";
import {makeStyles} from '@material-ui/core/styles';
import {ADMIN_ROLE, EDITOR_ROLE, getUsername, getUserRole, SUPPORT_ROLE} from "./utils/helpers";


class App extends React.Component {
    state = {
        currentUserRole: null
    }

    componentDidMount() {
    }

    render() {
        return (
            <BrowserRouter>
                <MyNavBar/>

                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <AuthenticatedComponent>
                            <Route exact path="/support" component={SupportPage}/>
                            <Route exact path="/userManager" component={UserManager}/>
                            <Route exact path="/editor" component={EditorPage}/>
                            <Route exact path="/userLog" component={UserLog}/>
                        </AuthenticatedComponent>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function MyNavBar() {
    const classes = useStyles();
    let history = useHistory();

    history.listen((location, action) => {
        console.log("on route change");
    });


    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar>
                <Typography style={getUserRole() === EDITOR_ROLE ? {} : {display: 'none'}}
                            className={classes.navbarLinkWrapper}>
                    <Link to="/editor" className={classes.navbarLink}>Editor</Link>
                </Typography>
                <Typography
                    style={getUserRole() === SUPPORT_ROLE || getUserRole() === ADMIN_ROLE ? {} : {display: 'none'}}
                    className={classes.navbarLinkWrapper}>
                    <Link to="/support" className={classes.navbarLink}>Support</Link>
                </Typography>
                <Typography style={getUserRole() === ADMIN_ROLE ? {} : {display: 'none'}}
                            className={classes.navbarLinkWrapper}>
                    <Link to="/userLog" className={classes.navbarLink}>User Log</Link>
                </Typography>
                <Typography style={getUserRole() === ADMIN_ROLE ? {} : {display: 'none'}}
                            className={classes.navbarLinkWrapper}>
                    <Link to="/userManager" className={classes.navbarLink}>User Manager</Link>
                </Typography>
                <Typography color="inherit" style={{ flex: 1 }}>
                </Typography>
                {getUsername() ? <Logout/> : ""}
            </Toolbar>
        </AppBar>

    );
}

const useStyles = makeStyles(theme => ({
    navbar: {
        marginBottom: 10
    },
    menuButton: {
        float: 'right'
    },
    navbarLinkWrapper: {
        marginRight: 20
    },

    navbarLink: {
        color: '#ffffff',
        fontSize: 20,
        '&:hover': {
            color: '#e8e5e5',
            textDecoration: 'none'
        },
    },
    lastNavbarLink: {
        flexGrow: 1,
    },
    lastLink: {
        flexGrow: 1,
    },
}));


export default App;

