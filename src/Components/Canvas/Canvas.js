import React from "react";
import CanvasContainer from "./CanvasContainer";
import Sidebar from '../Sidebar/Sidebar';
import {
    handleSocketData,
    addShape,
    deleteAllShapesByBoardId,
    getIsManagerForBoard,
    getShapesByBoardId,
    getUserShapeLimits,
} from "../../utils/http";
import {getShapeData} from "../../utils/shapeUtils";
import DeleteModal from "../Modals/DeleteModal";
import {alertType} from "../Alerts/AlertConstants";
import "./Canvas.css";
import CanvasHeader from "./CanvasHeader";
import ShapePicker from "../Shapes/ShapePicker";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elementWidth: 0,
            elementHeight: 0,
            color: '#fff',
            selectedShape: 'RECT',
            height: 50,
            width: 50,
            radius: 30,
            text: 'Text',
            existingShapes: [],
            isManager: false,
            deleteModalVisible: false,
            shouldAddBoard: false,
            alertType: null,
            shapesCreated: 0,
            maxShapes: 0,
        };
        if (props.boardId) {
            handleSocketData(props.boardId, this.handleAddShape, this.managerDeletedShapes, this.handleResetShapes);
        }
    }

    getShapesCreatedStyle = () => {
        return {
            color: this.state.color,
            fontSize: this.state.elementHeight / 35,
            width: '100%',
            display: 'block',
            cursor: 'default',
            marginLeft: '8%',
            padding: '0',
            marginBottom: '10%',
            marginTop: '-30px'
        }
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        this.checkIfManager();
        this.loadShapesFromDb();
        this.getShapeLimits();
    };

    updateDimensions = () => {
        this.setState({
            elementHeight: document.body.clientHeight,
            elementWidth: document.body.clientWidth
        });
    };

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    handleAddShape = (data) => {
        const existingShapes = this.state.existingShapes;
        existingShapes.push(data);
        this.setState({
            existingShapes
        });
    };

    handleResetShapes = () => {
        this.setState({
            shapesCreated: 0,
            alertType: alertType.RESET
        });
    };

    managerDeletedShapes = () => {
        this.setState({
            existingShapes: [],
            alertType: alertType.DELETE
        })
    };

    getShapeLimits = () => {
        getUserShapeLimits()
            .then(response => {
                this.setState({
                    shapesCreated: response.data.shapes_created,
                    maxShapes: response.data.maxShapes
                });
            });
    };

    checkIfManager = (callbackIfTrue) => {
        if (this.props.boardId) {
            getIsManagerForBoard(this.props.boardId)
                .then(response => {
                    if (!response.data.error) {
                        this.setState({isManager: response.data}, () => {
                            if (response.data && callbackIfTrue) {
                                callbackIfTrue();
                            }
                        });
                    }
                })
                .catch(() => {
                    this.setState({isManager: false})
                });
        }
    };

    loadShapesFromDb = () => {
        const boardId = this.props.boardId;
        if (boardId) {
            getShapesByBoardId(boardId)
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

    setShape = (selectedShape) => {
        this.setState({selectedShape});
    };

    setColor = (color) => {
        this.setState({color: color.hex});
    };

    onWidthChange = (event) => {
        this.setState({width: event.target.value});
    };

    onHeightChange = (event) => {
        this.setState({height: event.target.value});
    };

    onRadiusChange = (event) => {
        this.setState({radius: event.target.value});
    };

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    onClickDelete = () => {
        this.setState({deleteModalVisible: true});
    };

    onDeleteModalClose = () => {
        this.setState({deleteModalVisible: false});
    };

    handleDelete = (callback) => {
        deleteAllShapesByBoardId(this.props.boardId)
            .then(() => {
                if (callback) {
                    callback();
                }
                this.setState({deleteModalVisible: false, existingShapes: []});
            });
    };


    canAddShape = () => {
        return (this.state.shapesCreated < this.state.maxShapes);
    };

    onChangeComplete = (color) => {
        this.setColor(color.hex);
    };

    onChange = (color) => {
        this.setColor(color.hex);
    };

    onCanvasClick = (event) => {
        if (this.canAddShape()) {
            const data = getShapeData({
                x: event.evt.layerX,
                y: event.evt.layerY,
                color: this.state.color,
                shape: this.state.selectedShape,
                width: Math.min(100, this.state.width),
                height: Math.min(100, this.state.height),
                text: this.state.text,
                radius: Math.min(100, this.state.radius),
                board_id: this.props.boardId,
                shouldAddBoard: this.state.shouldAddBoard
            });
            const existingShapes = this.state.existingShapes;
            let shapesCreated = this.state.shapesCreated;
            existingShapes.push(data);
            shapesCreated++;
            this.setState({
                    existingShapes,
                    shouldAddBoard: false,
                    shapesCreated
                },
                () => {
                    addShape(data)
                        .then(response => {
                            if (response.error) {
                                alert(`Failed to insert shape! ${response.error}`);
                            }
                            else {
                            }
                        })
                        .then(() => {
                            if (!this.state.isManager) {
                                this.checkIfManager(() => {
                                    this.setState({
                                        alertType: alertType.MANAGER
                                    });
                                });
                            }
                        });
                });
        }
        else {
            this.setState({alertType: alertType.MAX});
        }
    };

    dismissAlert = () => {
        this.setState({
            alertType: null,
        });
    };

    render() {
        const sideBarChildren =
            <div style={this.getShapesCreatedStyle()}>
                Shapes created today: {this.state.shapesCreated} out of {this.state.maxShapes}
            </div>;
        const shapePicker =
            <ShapePicker
                parentHeight={this.state.elementHeight}
                parentWidth={this.state.elementWidth}
                text={this.state.text}
                radius={this.state.radius}
                height={this.state.height}
                width={this.state.width}
                color={this.state.color}
                shape={this.state.selectedShape}
                onChange={this.setColor}
                onChangeComplete={this.setColor}
                onWidthChange={this.onWidthChange}
                onHeightChange={this.onHeightChange}
                onTextChange={this.onTextChange}
                onRadiusChange={this.onRadiusChange}/>;
        return (
            <div id="outer-container">
                <DeleteModal
                    onDeleteModalClose={this.onDeleteModalClose}
                    handleDelete={this.handleDelete}
                    deleteModalVisible={this.state.deleteModalVisible}/>
                <CanvasHeader
                    parentWidth={this.state.elementWidth}
                    alertType={this.state.alertType}
                    isManager={this.state.isManager}
                    disabled={this.state.existingShapes.length === 0}
                    boardId={this.props.boardId}
                    dismissAlert={this.dismissAlert}
                    onClickDelete={this.onClickDelete}
                />
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
                         children={sideBarChildren}
                         parentWidth={this.state.elementWidth}
                         parentHeight={this.state.elementHeight}
                         color={this.state.color}
                         selectedShape={this.state.selectedShape}
                         setShape={this.setShape}
                         shapePicker={shapePicker}
                />
                <CanvasContainer
                    onCanvasClick={this.onCanvasClick}
                    parentWidth={this.state.elementWidth}
                    parentHeight={this.state.elementHeight}
                    existingShapes={this.state.existingShapes}
                />
            </div>
        );
    }
}

export default Canvas;