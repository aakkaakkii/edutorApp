import React from "react";
import {getUserRole} from "../utils/helpers";

class Home extends React.Component{

    componentDidMount() {
        switch (getUserRole()) {
            case "ADMIN":
                this.props.history.push('/userManager')
                break;
            case "SUPPORT":
                this.props.history.push('/support')
                break;
            case "EDITOR":
                this.props.history.push('/editor')
                break;
            default:
                this.props.history.push('/login')
                break;
        }
    }

    render() {
        return (
            <div>home</div>
        );
    }
}

export default Home;
