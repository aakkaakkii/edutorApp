import React from "react";
import {APP_REST_URL} from "../../utils/utils";
import {APP_JWT, APP_USER, clearUserDataFromLocalStorage, CURRENT_USER_ROLE} from "../../utils/helpers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import jwt from 'jwt-decode'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    detectChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = () => {
        fetch(APP_REST_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then(res => res.json())
            .then(data => {
                clearUserDataFromLocalStorage();

                localStorage.setItem(APP_USER, data.username)
                localStorage.setItem(APP_JWT, data.token)
                this.redirectTo(jwt(data.token).roles)

            })
    }

    redirectTo = (roles) => {
        let role = roles[0];
        localStorage.setItem(CURRENT_USER_ROLE, role)
        switch (role) {
            case "ADMIN":
                this.props.history.push('/userManager')
                break;
            case "SUPPORT":
                this.props.history.push('/support')
                break;
            case "EDITOR":
                this.props.history.push('/editor')
                break;
        }
    }



    render() {
        return (
            <Container  maxWidth="xs">
                        <TextField type='text'
                                   variant="outlined"
                                   onChange={this.detectChange}
                                   label="Enter Username"
                                   name='username'
                                   margin="normal"
                                   fullWidth
                                   value={this.state.username}/>
                        <TextField type='password'
                                   variant="outlined"
                                   onChange={this.detectChange}
                                   label='Enter Password'
                                   name='password'
                                   margin="normal"
                                   fullWidth
                                   value={this.state.password}/>
                        <br/>
                        <Button variant="contained"
                                color="primary"
                                margin="normal"
                                fullWidth
                                onClick={this.handleSubmit}>
                            Log in
                        </Button>
            </Container>

        );
    }
}

export default Login;
