import React from "react";
import Canvas from "./Components/Canvas/Canvas";
import {getUser, initSocket} from "./utils/http";
import Welcome from "./Components/Welcome/Welcome";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.path = document.location.pathname;
        this.state = {
            title: this.path === "/" ? 'Canva-Share' : this.path.replace('/', ''),
            identifier: ''
        };
        document.getElementsByTagName('title')[0].textContent = decodeURI(this.state.title);
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
                        boardId={decodeURI(this.state.title)}
                    />
                }
            </div>
        );
    }
}

export default App;