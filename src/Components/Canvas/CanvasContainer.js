import React from "react";
import {Layer, Stage} from "react-konva";
import Shape from "../Shapes/Shape"
import {Row} from "react-bootstrap";

class CanvasContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height:0,
            width:0
        }
    }


    updateDimensions = () => {
        this.setState({
            height: this.parentElement.attrs.container.clientHeight,
            width: this.parentElement.attrs.container.clientWidth
        });
    };

    componentWillMount = () => {
        if (this.parentElement && this.parentElement.attrs)
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };


    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    };



    render() {
        return (
            <Row className={'canvas-row'}>
                <Stage className={'canvas-container'}
                       ref={ (parentElement) => this.parentElement = parentElement}
                       onClick={this.props.onCanvasClick}
                       height={this.state.height}
                       width={this.state.width}>
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
            </Row>
        );
    }
}

export default CanvasContainer;