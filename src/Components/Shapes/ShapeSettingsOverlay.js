import React from "react";
import "./ShapeSettings.css";
import Overlay from "../../../node_modules/react-bootstrap/Overlay";
import Tooltip from "../../../node_modules/react-bootstrap/Tooltip";
import ShapeSettings from "./ShapeSettings";

class ShapeSettingsOverlay extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,
            settingsButtonRef: null
        }
    }


    attachRef = (settingsButtonRef) => {
        this.setState({settingsButtonRef})
    };

    handleClick = () => {
        this.setState({show: !this.state.show});
    };

    disableSettings = () => {
        this.setState({show: false});
    };

    render() {
        const {show, settingsButtonRef} = this.state;

        return (
            <>
                <i className="fas fa-cog"
                   onClick={this.handleClick}
                   ref={this.attachRef}
                />
                <Overlay target={settingsButtonRef} show={show} placement="bottom">
                    <Tooltip>
                        <ShapeSettings
                        handleClickOutside={this.disableSettings}
                        text={this.props.text}
                        radius={this.props.radius}
                        height={this.props.height}
                        width={this.props.width}
                        onWidthChange={this.props.onWidthChange}
                        onHeightChange={this.props.onHeightChange}
                        onTextChange={this.props.onTextChange}
                        onRadiusChange={this.props.onRadiusChange}
                        selectedShape={this.props.selectedShape}/>
                    </Tooltip>
                </Overlay>
            </>
        );
    }
}

export default ShapeSettingsOverlay;

