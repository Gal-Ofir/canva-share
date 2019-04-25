import React from "react";
import {Stage, Layer} from "react-konva";
import Shape from "../Shapes/Shape"

class CanvasContainer extends React.Component {

    getWidth = () => {
        return Math.floor(this.props.parentWidth * 0.77);
    };

    getHeight = () => {
        return Math.floor(this.props.parentHeight * 0.85);
    };


    handleOnClick = (event) => {
        this.props.onCanvasClick(event);
    };

    render() {
        return (
            <Stage style={{
                position: 'relative', paddingTop: '57px',
                marginLeft: '19%'
            }}
                   onClick={this.handleOnClick}
                   width={this.getWidth()} height={this.getHeight()}>
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
        );
    }
}

export default CanvasContainer;