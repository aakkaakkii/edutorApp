import React from 'react';
import {APP_REST_URL} from "../utils/utils";
import {getFullJwt, getUsername} from "../utils/helpers";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class EditorPage extends React.Component {
    state = {
        currentTask: {
            tasks: 0
        },
    }

    componentDidMount() {
        console.log(APP_REST_URL + '/userTasks/user/' + getUsername())

        fetch(APP_REST_URL + '/userTasks/user/' + getUsername(), {
            method: 'GET',
            headers: {
                Authorization: getFullJwt()
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 403) {
                    return Promise.reject(response.json())
                }
                return response.json()
            })
            .then(data => {
                this.setState({currentTask: data})
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
                this.props.history.push('/login')
            });
    }

    incrementTask = () => {
        this.setState({isDisabled: true});
        fetch(APP_REST_URL + '/userTasks/increment/' + this.state.currentTask.id, {
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
                this.setState({currentTask: task, isDisabled: false})
            })
            .catch(error => {
            });
    }

    decrementTask = () => {
        this.setState({isDisabled: true});
        fetch(APP_REST_URL + '/userTasks/decrement/' + this.state.currentTask.id, {
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
                this.setState({currentTask: task, isDisabled: false})
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
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} align="center">
                        <div className='text-center'>
                            <div style={{fontSize: 40}}>{this.state.currentTask.tasks}</div>
                            <div>
                                <Button variant="contained"
                                        color="primary"
                                        className="mr-1"
                                        disabled={this.state.isDisabled}
                                        onClick={this.decrementTask}>-</Button>
                                <Button variant="contained"
                                        color="primary"
                                        disabled={this.state.isDisabled}
                                        onClick={this.incrementTask}>+</Button>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default EditorPage;
