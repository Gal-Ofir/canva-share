import {GithubPicker} from "react-color";
import React from "react";

const shapeTypes = {
    TEXT: "Text",
    RECT: "Rectangle",
    CIRCLE: "Circle",
    TRIANGLE: "Triangle"
};

class ShapePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colorPickerOpen: false
        }
    }

    handleClick = () => {
        this.setState({colorPickerOpen: !this.state.colorPickerOpen});
    };


    onChangeComplete = (color) => {
        this.setState({colorPickerOpen: false});
        this.props.onChangeComplete(color);
    };


    resolveShapeModifier = () => {
        switch (this.props.shape) {
            case "TRIANGLE":
            case "CIRCLE":
                return (
                    <div style={{marginTop: '8px'}}>
                        <span> Size (radius): </span>
                        <input value={this.props.radius} type={"number"} style={{
                            width: Math.floor(this.props.parentWidth * 0.04),
                            height: this.props.parentHeight * 0.035
                        }} max={100} min={5}
                               onChange={this.props.onRadiusChange}/>
                    </div>
                );
            case "RECT":
                return (
                    <div style={{marginTop: '8px'}}>
                        <span> Height: </span>
                        <input type={"number"} style={{
                            width: Math.floor(this.props.parentWidth * 0.04),
                            height: this.props.parentHeight * 0.035
                        }} max={100} min={5}
                               onChange={this.props.onHeightChange} value={this.props.height}/>
                        <div><span>Width: </span>
                            <input type={"number"} style={{
                                width: Math.floor(this.props.parentWidth * 0.04),
                                height: this.props.parentHeight * 0.035,
                                marginLeft: '5px'
                            }} max={100} min={5}
                                   onChange={this.props.onWidthChange} value={this.props.width}/>
                        </div>
                    </div>
                );
            case "TEXT":
                return <div style={{marginTop: '8px'}}>
                    <div> Enter text:</div>
                    <input value={this.props.text} type={"text"} style={{
                        width: Math.floor(this.props.parentWidth * 0.1),
                        height: this.props.parentHeight * 0.035
                    }}
                           onChange={this.props.onTextChange}/>
                </div>;
            default:
                return <div>{""}</div>;
        }
    };

    render() {
        const shapeModifier = this.resolveShapeModifier();
        return (
            <div style={{fontSize: this.props.parentHeight / 35}}>
                <div style={{marginBottom: '8px', color: this.props.color, cursor: 'pointer'}}
                     onClick={this.handleClick}
                     onBlur={this.handleBlur}>Choose a color...
                </div>
                {this.state.colorPickerOpen &&
                <GithubPicker
                    color={this.props.color}
                    onChangeComplete={this.onChangeComplete}
                    onChange={this.props.onChange}
                />
                }
                <div style={{color: "#ffffff", marginTop: '8px'}}>
                    Current shape: {shapeTypes[this.props.shape]}
                    {shapeModifier}
                </div>
            </div>

        );
    }
}

export default ShapePicker;