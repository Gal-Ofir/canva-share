import React from "react";
import "./Welcome.css";
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0
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
    };

    render() {
        return <div className={'welcome-container'} style={{height: this.state.height, width: this.state.width}}>
                <div className={'welcome-message'}>
                    Welcome to Canva-Share!
                    <div className={'welcome-submessage'}>
                        Pick an existing board or create a new one and get started with your friends
                    </div>
                </div>
            <div className={"canvas"}>
                Hi
            </div>
            <div className={"canvas"}>
                Hello
            </div>
            <div className={"canvas"}>
                Hi
            </div>
            <div className={"canvas"}>
                Hi
            </div>
        </div>;
    }
}

export default Welcome;
