import React from "react";
import {Stage, Layer} from "react-konva";
import Shape from "../Shapes/Shape"
import * as httpUtils from "../../utils/http";

class CanvasContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            selectedColor: '#fff',
            selectedShape: 'RECT',
            existingShapes: [],
            shouldAddBoard: false
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

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.refreshCanvas) {
            this.setState({existingShapes: []}, this.props.afterRefreshCanvas);
        }
    };

    getBoardId = () => {
        return document.location.pathname.replace("/", "");
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        this.loadShapesFromDb();
    };

    loadShapesFromDb = () => {
        // todo preloader while loading
        const boardId = this.getBoardId();
        if (boardId) {
            httpUtils.getShapesByBoardId(boardId)
                .then(shapesFromDb => {
                    if (shapesFromDb.data.length) {
                        this.setState({
                            existingShapes: this.state.existingShapes.concat(shapesFromDb.data)
                        });
                    }
                    else {
                        this.setState({shouldAddBoard: true});
                    }
                });
        }
    };

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    handleOnClick = (event) => {
        const x = event.evt.layerX;
        const y = event.evt.layerY;
        const color = this.props.color;
        const data = {
            x,
            y,
            color,
            shape: this.props.shape,
            width: this.props.width,
            height: this.props.height,
            text: this.props.text,
            radius: this.props.radius,
            board_id: this.getBoardId(),
            shouldAddBoard: this.state.shouldAddBoard
        };
        const existingShapes = this.state.existingShapes;
        existingShapes.push(data);
        this.setState({
                existingShapes,
                shouldAddBoard: false
            },
            () => {
                httpUtils.addShape(data)
                    .then(response => {
                        if (!response.error) {
                        }
                        else {
                            alert(`Failed to insert shape! ${response.error}`);
                        }
                    })
            });

    };

    render() {
        return (
            <div style={{float: 'right'}}>
                <Stage
                    onClick={this.handleOnClick}
                    width={this.state.width} height={this.state.height}>
                    <Layer>
                        {this.state.existingShapes.map((shapeProps, i) => {
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