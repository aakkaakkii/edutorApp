import React from "react";
import {CURRENT_USER, getFullJwt, getJwt, getUsername} from "../../utils/helpers";
import {APP_REST_URL} from "../../utils/utils";
import {withRouter} from "react-router-dom";

class AuthenticatedComponent extends React.Component {
    state = {
        user: null,
    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login')
        }
        fetch(APP_REST_URL + '/users/username/' + getUsername(), {
            method: 'GET',
            headers: {
                Authorization: getFullJwt()
            },
        })
            .then(response => response.json())
            .then(result => {
                this.setState({user: result})
                localStorage.setItem(CURRENT_USER, JSON.stringify(result))
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
    }

    render() {
        if (this.state.user) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <div className='text-center'>
                    <div>not authorised</div>
                </div>
            );
        }

    }
}

export default withRouter(AuthenticatedComponent);
