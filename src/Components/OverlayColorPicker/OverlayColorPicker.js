import React from "react";
import Tooltip from "../../../node_modules/react-bootstrap/Tooltip";
import Button from "../../../node_modules/react-bootstrap/Button";
import {CirclePicker} from "react-color";
import "./OverlayColorPicker.css";
import Overlay from "../../../node_modules/react-bootstrap/Overlay";
import * as clickOutside from "react-click-outside";

class OverlayColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            colorButtonRef: null
        }
    }

    onChangeComplete = (color) => {
        this.setState({show: false});
        this.props.onChangeComplete(color);
    };

    attachRef = (colorButtonRef) => {
        this.setState({colorButtonRef})
    };

    handleClick = () => {
        this.setState({show: !this.state.show});
    };

    handleClickOutside() {
        this.setState({show: false});
    }

    render() {
        const {show, colorButtonRef} = this.state;
        return (
            <>
                <Button
                    onClick={this.handleClick}
                    ref={this.attachRef}
                    style={{backgroundColor: this.props.color || "#fff", borderRadius: '18px', height: '26px'}}/>
                <Overlay target={colorButtonRef} show={show} placement="bottom">
                    <Tooltip>
                        <CirclePicker
                            color={this.props.color}
                            onChangeComplete={this.onChangeComplete}
                            onChange={this.props.onChange}/>
                    </Tooltip>
                </Overlay>
            </>
        );
    }
}

export default clickOutside(OverlayColorPicker);