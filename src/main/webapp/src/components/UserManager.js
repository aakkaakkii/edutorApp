import React from 'react';
import {APP_REST_URL} from "../utils/utils";
import {getFullJwt} from "../utils/helpers";
import {
    TableRow,
    TableCell,
    TableContainer,
    Button,
    Grid,
    Container,
    TableHead,
    TableBody,
    TextField, FormControl
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import Select from "@material-ui/core/Select";
import {DeleteOutline} from '@material-ui/icons'

class UserManager extends React.Component {
    state = {
        users: [],
        roles: [],
        selectedUser: {
            id: null,
            username: '',
            password: '',
            roles: ''
        },
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        fetch(APP_REST_URL + '/users', {
            method: 'GET',
            headers: {
                Authorization: getFullJwt()
            }
        })
            .then(response => {
                if (response.status === 403) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(result => {
                this.setState({users: result})
            })
            .catch(error => {
                console.error('Error:', error);
                this.props.history.push('/login')
            });
        fetch(APP_REST_URL + '/users/roles', {
            method: 'GET',
            headers: {
                Authorization: getFullJwt()
            }
        })
            .then(response => {
                if (response.status === 403) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(result => {
                this.setState({roles: result})
            })
            .catch(error => {
                console.error('Error:', error);
                this.props.history.push('/login')
            });
    }

    handleSubmit = () => {
        let selectedUser = this.state.selectedUser

        fetch(APP_REST_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getFullJwt()
            },
            body: JSON.stringify(selectedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(prevState => ({users: [...prevState.users, data]}))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    detectUserChange = (e) => {
        let selectedUser = {...this.state.selectedUser};
        selectedUser[e.target.name] = e.target.value;
        this.setState({selectedUser: selectedUser})
    }

    onSelectUser = (el) => {
        let user = {...el}
        user["password"] = '';
        user["roles"] = el['roles'][0]
        this.setState({selectedUser: user})
    }

    onClearUser = () => {
        this.setState({
            selectedUser: {
                id: null,
                username: '',
                password: '',
                roles: ''
            }
        })
    }

    onAddUser = () => {
        fetch(APP_REST_URL + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getFullJwt()
            },
            body: JSON.stringify({
                id: this.state.selectedUser.id,
                username: this.state.selectedUser.username,
                password: this.state.selectedUser.password,
                roles: [this.state.selectedUser.roles],
            })
        })
            .then(response => {
                if (response.status === 500) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(data => {
                this.loadUsers();
                this.onClearUser();
            })
            .catch(error => {
                if (error instanceof Promise) {
                    error.then(message => {
                        console.error('Error:', message);
                        alert(message.message);
                    })
                } else {
                    alert(error)
                }
            })
    }


    onEditUser = () => {
        fetch(APP_REST_URL + '/users/' + this.state.selectedUser.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getFullJwt()
            },
            body: JSON.stringify({
                id: this.state.selectedUser.id,
                username: this.state.selectedUser.username,
                password: this.state.selectedUser.password,
                roles: [this.state.selectedUser.roles],
            })
        })
            .then(response => {
                if (response.status === 500) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(data => {
                this.loadUsers();
                this.onClearUser();
            })
            .catch(error => {
                if (error instanceof Promise) {
                    error.then(message => {
                        console.error('Error:', message);
                        alert(message.message);
                    })
                } else {
                    alert(error)
                }
            })
    }


    onUserDelete = (el) => {
        if (window.confirm(`Do you really want to delete - ${el.username} ?`)) {
            this.deleteUser(el);
        }
    }

    deleteUser = (el) => {
        fetch(APP_REST_URL + '/users/' + el.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getFullJwt()
            }
        })
            .then(response => {
                if (response.status === 500) {
                    return Promise.reject(response.json())
                }
                this.loadUsers();
                this.onClearUser();
            })
            .catch(error => {
                if (error instanceof Promise) {
                    error.then(message => {
                        console.error('Error:', message);
                        alert(message.message);
                    })
                } else {
                    alert(error)
                }
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <Container>
                <Grid container>
                    <Grid item xs={6} align="center">
                        <TableContainer>
                            <Table className={classes.myTable}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Users</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map(el =>
                                        <TableRow
                                            classes={{hover: classes.hover, selected: classes.selected}}
                                            className={classes.tableRow}
                                            selected={el.id === this.state.selectedUser.id}
                                            onClick={() => this.onSelectUser(el)}
                                            key={el.id}>
                                            <TableCell className={classes.tableCell}>
                                                {el.username} - {el.roles}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={[classes.tableCell, classes.tableActionCell].join(" ")}>
                                                <DeleteOutline onClick={() => this.onUserDelete(el)}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={this.onClearUser}
                                    className={classes.formItem}
                            >
                                Clear
                            </Button>
                            <TextField type='text'
                                       variant="outlined"
                                       label="Username"
                                       name='username'
                                       autoComplete='off'
                                       onChange={this.detectUserChange}
                                       value={this.state.selectedUser.username}
                                       className={classes.formItem}
                            />
                            <TextField type='password'
                                       variant="outlined"
                                       label="password"
                                       name='password'
                                       onChange={this.detectUserChange}
                                       value={this.state.selectedUser.password}
                                       className={classes.formItem}
                            />

                            <Select
                                native
                                variant="outlined"
                                name='roles'
                                onChange={this.detectUserChange}
                                value={this.state.selectedUser.roles}
                                className={classes.formItem}
                            >
                                <option value=""/>
                                {this.state.roles.map(role => <option key={role} value={role}>{role}</option>)}
                            </Select>

                            <Button variant="contained"
                                    color="primary"
                                    onClick={this.onEditUser}
                                    className={classes.formItem}
                            >
                                Edit User
                            </Button>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={this.onAddUser}
                                    className={classes.formItem}
                            >
                                Add User
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const styles = theme => ({
    tableRow: {
        "&$selected, &$selected:hover": {
            backgroundColor: "#4051b5"
        }
    },
    tableCell: {
        "$selected &": {
            color: '#ffffff',
            fontWeight: 'bold'
        }
    },
    tableActionCell: {
        cursor: 'pointer',
    },
    hover: {},
    selected: {},
    formItem: {
        marginTop: 10
    },
    myTable: {
        maxWidth: 300
    }
});

export default withStyles(styles)(UserManager);
