import React from "react";
import Canvas from "./Components/Canvas/Canvas";
import {getUser, initSocket} from "./utils/http";
import Welcome from "./Welcome";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.path = document.location.pathname;
        this.state = {
            title: this.path === "/" ? 'Canva-Share' : this.path.replace('/', ''),
            identifier: ''
        };
        document.getElementsByTagName('title')[0].textContent = this.state.title;
        initSocket();
    }

    componentDidMount = () => {
        getUser();
    };

    render() {
        return (
            <div>
                {this.path === '/' ?
                    <Welcome/> :
                    <Canvas
                        boardId={this.state.title}
                    />
                }
            </div>
        );
    }
}

export default App;