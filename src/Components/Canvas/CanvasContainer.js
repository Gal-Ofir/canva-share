import React from "react";
import {Stage, Layer} from "react-konva";
import Shape from "../Shapes/Shape"

class CanvasContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
        };

    }

    getWidth = () => {
        return Math.floor(window.innerWidth * 0.79);
    };

    updateDimensions = () => {
        this.setState({
            height: window.innerHeight,
            width: this.getWidth()
        });
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
    };

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    handleOnClick = (event) => {
        this.props.onCanvasClick(event);
    };

    render() {
        return (
            <div style={{float: 'right'}}>
                <Stage
                    onClick={this.handleOnClick}
                    width={this.state.width} height={this.state.height}>
                    <Layer>
                        {this.props.existingShapes.map((shapeProps, i) => {
                            const {color, height, shape, text, width, x, y, radius} = shapeProps;
                            return <Shape
                                color={color}
                                height={height}
                                shape={shape}
                                text={text}
                                width={width}
                                x={x}
                                y={y}
                                radius={radius}
                                key={i}/>
                        })}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default CanvasContainer;