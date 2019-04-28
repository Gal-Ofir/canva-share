import React from "react";
import CanvasContainer from "./CanvasContainer";
import {
    addShape,
    deleteAllShapesByBoardId,
    getIsManagerForBoard,
    getShapesByBoardId,
    getUserShapeLimits,
    handleSocketData,
} from "../../utils/http";
import {getShapeData} from "../../utils/shapeUtils";
import DeleteModal from "../Modals/DeleteModal";
import {alertType} from "../Alerts/AlertConstants";
import "./Canvas.css";
import CanvasHeader from "./CanvasHeader";
import {Alerts} from "../Alerts/Alerts";
import DropdownShapePicker from "../DropdownPicker/DropdownShapePicker";
import OverlayColorPicker from "../OverlayColorPicker/OverlayColorPicker";
import ShapeSettingsOverlay from "../Shapes/ShapeSettingsOverlay";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount = () => {
        this.checkIfManager();
        this.loadShapesFromDb();
        this.getShapeLimits();
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

    onShapeChange = (event) => {
        console.log(event.target);
        this.setState({selectedShape: event.target.id.toUpperCase()});
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
        return (
            <>
                <Alerts
                    alertType={this.state.alertType}
                    onClose={this.dismissAlert}
                />
                <DeleteModal
                    onDeleteModalClose={this.onDeleteModalClose}
                    handleDelete={this.handleDelete}
                    deleteModalVisible={this.state.deleteModalVisible}/>
                <CanvasHeader
                    alertType={this.state.alertType}
                    isManager={this.state.isManager}
                    disabled={this.state.existingShapes.length === 0}
                    boardId={this.props.boardId}
                    dismissAlert={this.dismissAlert}
                    onClickDelete={this.onClickDelete}
                    shapePicker={<>
                        <OverlayColorPicker
                            color={this.state.color}
                            onChange={this.setColor}
                            onChangeComplete={this.setColor}/>
                        <DropdownShapePicker
                            color={this.state.color}
                            handleOnClick={this.onShapeChange}
                            selectedShape={this.state.selectedShape}/>
                        <ShapeSettingsOverlay
                            text={this.state.text}
                            radius={this.state.radius}
                            height={this.state.height}
                            width={this.state.width}
                            onWidthChange={this.onWidthChange}
                            onHeightChange={this.onHeightChange}
                            onTextChange={this.onTextChange}
                            onRadiusChange={this.onRadiusChange}
                            selectedShape={this.state.selectedShape}/>
                    </>}
                    shapesCreated={this.state.shapesCreated}
                    maxShapes={this.state.maxShapes}/>
                <CanvasContainer
                    onCanvasClick={this.onCanvasClick}
                    existingShapes={this.state.existingShapes}
                />
            </>
        );
    }
}

export default Canvas;