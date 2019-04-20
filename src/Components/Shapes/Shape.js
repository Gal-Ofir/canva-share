import React from "react";
import {Rect, Circle, RegularPolygon, Text} from "react-konva";

class Shape extends React.Component {

    resolveShape = () => {
        const {color, height, shape, text, width, x, y, radius} = this.props;
        switch (shape) {
            case "TEXT":
                return <Text
                    text={text}
                    x={x}
                    y={y}
                    align={'center'}
                    fill={color === "#fff" ? "#000" : color}
                    fontSize={20}
                />;
            case "CIRCLE":
                return <Circle
                    x={x}
                    y={y}
                    radius={radius}
                    fill={color}
                    stroke={color}
                    strokeWidth={1}
                    shadowBlur={5}/>;
            case "TRIANGLE":
                return <RegularPolygon
                    x={x}
                    y={y}
                    sides={3}
                    radius={radius}
                    fill={color}
                    shadowBlur={5}/>;
            case "RECT":
            default:
                return <Rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    shadowBlur={5}/>;
        }
    };

    render() {
        return this.resolveShape();
    }
}

export default Shape;