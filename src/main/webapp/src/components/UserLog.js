import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
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
import Table from "@material-ui/core/Table";
import {APP_REST_URL} from "../utils/utils";
import {EDITOR_ROLE, getFullJwt, getUserRole} from "../utils/helpers";
import {DeleteOutline} from "@material-ui/icons";


class UserLog extends React.Component {
    state = {
        userLogs: []
    }

    componentDidMount() {
        this.loadUserLogs();
    }

    loadUserLogs = () => {
        fetch(APP_REST_URL + '/userLog', {
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
                this.setState({userLogs: result})
            })
            .catch(error => {
                console.error('Error:', error);
                this.props.history.push('/login')
            });
    }


    render() {
        const {classes} = this.props;

        return (
            <Container aligne="center">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Users</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userLogs.map(el =>
                            <TableRow
                                classes={{hover: classes.hover, selected: classes.selected}}
                                className={classes.tableRow}
                                key={el.id}>
                                <TableCell className={classes.tableCell}>
                                    {el.userName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <span style={el.action === 'INCREMENT' ? {color: 'green'} : {color: 'red'}}>{el.message}</span>
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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

export default withStyles(styles)(UserLog);