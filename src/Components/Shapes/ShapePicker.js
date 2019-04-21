import {GithubPicker} from "react-color";
import React from "react";

const shapeTypes = {
    TEXT: "Text",
    RECT: "Rectangle",
    CIRCLE: "Circle",
    TRIANGLE: "Triangle"
};

class ShapePicker extends React.Component {

    resolveShapeModifier = () => {
        switch (this.props.shape) {
            case "TRIANGLE":
            case "CIRCLE":
                return (
                    <div style={{marginTop: '8px'}}>
                    <span> Size (radius): </span>
                    <input value={this.props.radius} type={"number"} style={{width: '40px', height: '20px'}} max={100} min={5}
                        onChange={this.props.onRadiusChange}/>
                    </div>
                );
            case "RECT":
                return (
                    <div style={{marginTop: '8px'}}>
                        <span> Height: </span>
                        <input type={"number"} style={{width: '40px', height: '20px'}} max={100} min={5}
                        onChange={this.props.onHeightChange} value={this.props.height}/>
                        <div> <span>Width: </span>
                        <input type={"number"} style={{width: '40px', height: '20px', marginLeft: '5px'}} max={100} min={5}
                               onChange={this.props.onWidthChange} value={this.props.width}/>
                        </div>
                    </div>
                );
            case "TEXT":
                return <div style={{marginTop: '8px'}}>
                    <div> Enter text: </div>
                    <input value={this.props.text} type={"text"} style={{width: '80%', height: '20px'}}
                           onChange={this.props.onTextChange}/>
                </div>;
            default:
                return <div>{""}</div>;
        }
    };

    render() {
        const color = this.props.color;
        const shapeModifier = this.resolveShapeModifier();
        return (
            <div style={{fontSize: '16px'}}>
                <div style={{marginBottom: '8px', color: color}}>Choose a color...</div>

                <GithubPicker
                    color={color}
                    onChangeComplete={this.props.onChangeComplete}
                    onChange={this.props.onChange}
                />
                <div style={{color: "#ffffff", marginTop: '8px'}}>
                    Current shape: {shapeTypes[this.props.shape]}
                    {shapeModifier}
                    </div>
            </div>

        );
    }
}

export default ShapePicker;