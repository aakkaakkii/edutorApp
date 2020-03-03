import React from 'react';
import {APP_REST_URL} from "../utils/utils";
import {getFullJwt, getUser} from "../utils/helpers";
import {TableRow, TableCell, TableContainer, Button, Grid, Container, TableHead, TableBody} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";

class SupportPage extends React.Component {

    state = {
        tasks: [],
        selectTask: {
            id: null,
            tasks: null,
        },
        isDisabled: false
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        fetch(APP_REST_URL + '/userTasks/withUser', {
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
                console.log(result)
                this.setState({tasks: result})
            })
            .catch(error => {
                console.error('Error:', error);
                this.props.history.push('/login')
            });
    }

    onSelectUser = (task) => {
        fetch(APP_REST_URL + `/userTasks/${task.id}`, {
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
            .then(task => {
                this.setState({
                    selectTask: task,
                    task: this.state.tasks.map(el => {
                        if (el.id === task.id) {
                            return task;
                        }
                        return el;
                    })
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    incrementTask = () => {
        this.setState({isDisabled: true});
        fetch(APP_REST_URL + '/userTasks/increment/' + this.state.selectTask.id, {
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
            .then(task => {
                this.setState({
                    selectTask: task, isDisabled: false, tasks: this.state.tasks.map(el => {
                        if (el.id === task.id) {
                            return task;
                        }
                        return el;
                    })
                })
            })
            .catch(error => {
            });
    }

    decrementTask = () => {
        this.setState({isDisabled: true});
        fetch(APP_REST_URL + '/userTasks/decrement/' + this.state.selectTask.id, {
            method: 'GET',
            headers: {
                Authorization: getFullJwt()
            }
        })
            .then(response => {
                if (response.status === 500) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(task => {
                this.setState({
                    selectTask: task, isDisabled: false, tasks: this.state.tasks.map(el => {
                        if (el.id === task.id) {
                            return task;
                        }
                        return el;
                    })
                })
            })
            .catch(error => {
                error.then(message => {
                    console.error('Error:', message);
                    alert(message.message);
                    this.setState({isDisabled: false});
                })
            });
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.tasks.map(el =>
                                        <TableRow
                                            classes={{hover: classes.hover, selected: classes.selected}}
                                            className={classes.tableRow}
                                            selected={el.id === this.state.selectTask.id}
                                            onClick={() => this.onSelectUser(el)}
                                            key={el.id}>
                                            <TableCell
                                                className={classes.tableCell}>
                                                {el.user?el.user.username:"no user"} tasks: {el.tasks}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6} align="center">
                        <div style={{fontSize: 40}}>{this.state.selectTask.tasks}</div>
                        <div style={this.state.selectTask.tasks != null ? {} : {display: 'none'}}>
                            <Button className="mr-1" disabled={this.state.isDisabled}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.decrementTask}>-</Button>
                            <Button className="" disabled={this.state.isDisabled}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.incrementTask}>+</Button>
                        </div>
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
    hover: {},
    selected: {},
    myTable: {
        maxWidth:300
    }
});

export default withStyles(styles)(SupportPage);
