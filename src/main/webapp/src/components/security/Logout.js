import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import {clearUserDataFromLocalStorage} from "../../utils/helpers";


function Logout() {
    let history = useHistory();

    function handleClick() {
        history.push("/login");
        clearUserDataFromLocalStorage();
    }

    return (
        <Button color="inherit"
                onClick={handleClick}>
            Logout
        </Button>
    );
}


export default Logout;