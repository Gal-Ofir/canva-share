import React from "react";
import "./Welcome.css";
import {getAllBoards} from "./utils/http";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            boards: []
        }
    }

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    updateDimensions = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        getAllBoards()
            .then(boards => {
                this.setState({boards: boards.data})
            });
    };

    render() {
        return <div className={'welcome-container'} style={{height: this.state.height, width: this.state.width}}>
                <div className={'welcome-message'}>
                    Welcome to Canva-Share!
                    <div className={'welcome-submessage'}>
                        Pick an existing board or create a new one and get started with your friends
                    </div>
                </div>
            {this.state.boards.length && this.state.boards.map((board, i) => {
                return (<a key={i} href={`/${board}`}>
                        <div className={'canvas'}>
                            {board}
                        </div>
                </a>);
            })}
        </div>;
    }
}

export default Welcome;
