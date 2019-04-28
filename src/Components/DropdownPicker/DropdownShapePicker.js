import React from "react";
import Dropdown from "../../../node_modules/react-bootstrap/Dropdown";
import "./DropdownPicker.css";

const shapeClasses = {
    TRIANGLE: "fas fa-caret-up",
    RECT: "far fa-square",
    CIRCLE: "far fa-circle",
    TEXT: "fas fa-font"
};

class DropdownShapePicker extends React.Component {


    render() {
        const buttonColor = this.props.color === "#fff" ? '#000' : this.props.color;
        return (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic"
                                 style={{borderRadius: '10px', backgroundColor: "#fff"}}>
                    <i className={shapeClasses[this.props.selectedShape || 'RECT']}
                       style={{backgroundColor: '#fff', color: buttonColor, marginLeft: '1px'}}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Object.keys(shapeClasses).map((shapeId, i) => {
                        let size = (shapeId === "TRIANGLE") ? 'fa-3x' : 'fa-2x';
                        return (
                            <Dropdown.Item key={i} as={'span'} id={shapeId.toLowerCase()} onClick={this.props.handleOnClick}>
                                <i className={`${shapeClasses[shapeId]} ${size}`} id={shapeId.toLowerCase()} onClick={this.props.handleOnClick}/></Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

}

export default DropdownShapePicker;