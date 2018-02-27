import React from "react";
import {msg as Msg, connectToStore} from "iflux";
import {Link, withRouter} from "react-router";
import AppStore from "./store";

class Home extends React.Component {
    componentWillMount() {
    }

    render() {
        return (
            <div>
                Hello, World!
            </div>
        )
    }
}

export default withRouter(connectToStore(AppStore, true)(Home));