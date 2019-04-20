import React from "react";
import Canvas from "./Components/Canvas/Canvas";
import {createUser} from "./utils/http";
import Welcome from "./Welcome";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.path = document.location.pathname;
        this.state = {
            title: this.path === "/" ? 'Canva-Share' : 'Canva-Share - ' + this.path.replace('/', '')
        };
        document.getElementsByTagName('title')[0].textContent = this.state.title;
        createUser();
    }

    render() {
        return (
            <div>
                {this.path !== '/' ?
                    <Canvas
                        canvasRoom={this.state.title}/> :
                    <Welcome/>
                }
            </div>
        );
    }
}

export default App;