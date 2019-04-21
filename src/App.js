import React from "react";
import Canvas from "./Components/Canvas/Canvas";
import {createUser} from "./utils/http";
import Welcome from "./Welcome";
import socketIOClient from "socket.io-client";

let socket;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.path = document.location.pathname;
        this.state = {
            title: this.path === "/" ? 'Canva-Share' : this.path.replace('/', ''),
            identifier: ''
        };
        document.getElementsByTagName('title')[0].textContent = this.state.title;
        socket = socketIOClient(document.location.origin);
    }

    componentDidMount = () => {
        createUser()
            .then(response => {
                this.setState({identifier: response.data.identifier});
            })
    };

    render() {
        return (
            <div>
                {this.path !== '/' ?
                    <Canvas
                        identifier={this.state.identifier}
                        canvasRoom={this.state.title}/> :
                    <Welcome/>
                }
            </div>
        );
    }
}

export {socket,  App};