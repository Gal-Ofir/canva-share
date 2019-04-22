import React from "react";
import CanvasContainer from "./CanvasContainer";
import Sidebar from '../Sidebar/Sidebar';
import {
    socket,
    messageFromMe,
    getIsManagerForBoard,
    deleteAllShapesByBoardId,
    addShape,
    getShapesByBoardId,
    getUser,
    getMaxShapes
} from "../../utils/http";
import {Button} from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import Alerts from "../Alerts";

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
            deleteAlertVisible: false,
            managerAlertVisible: false,
            maxShapesAlertVisible: false,
            shapesCreated: 0,
            maxShapes: 0
        };
        if (props.boardId) {
            this.handleSocketData();
        }
    }

    handleSocketData = () => {
        socket.on(this.props.boardId, (data) => {
            if (!messageFromMe(data.ip)) {
                const existingShapes = this.state.existingShapes;
                existingShapes.push(data);
                this.setState({
                    existingShapes
                });
            }
        });
        socket.on(`delete:${this.props.boardId}`, (ip) => {
            if (!messageFromMe(ip)) {
                this.managerDeletedShapes();
            }
        })
    };

    managerDeletedShapes = () => {
        this.setState({
            existingShapes: [],
            deleteAlertVisible: true
        })
    };

    componentDidMount = () => {
        this.checkIfManager();
        this.loadShapesFromDb();
        this.getShapeLimits();
    };

    getShapeLimits = () => {
        getUser()
            .then(response => {
                return response.data.shapes_created
            })
            .then(shapesCreated => {
                getMaxShapes()
                    .then(response => {
                        this.setState({
                            shapesCreated,
                            maxShapes: response.data.maxShapes
                        });
                    });
            });
    };

    checkIfManager = (callbackIfTrue) => {
        if (this.props.boardId) {
            getIsManagerForBoard(this.props.boardId)
                .then(response => {
                    this.setState({isManager: response.data}, () => {
                        if (response.data && callbackIfTrue) {
                            callbackIfTrue();
                        }
                    });
                })
                .catch(() => {
                    this.setState({isManager: false})
                });
        }
    };

    loadShapesFromDb = () => {
        // todo preloader while loading
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
        this.setState({color});
    };

    onWidthChange = (width) => {
        this.setState({width});
    };

    onHeightChange = (height) => {
        this.setState({height});
    };

    onRadiusChange = (radius) => {
        this.setState({radius});
    };

    onTextChange = (text) => {
        this.setState({text});
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

    /**
     * Returns relevant data to save in db,
     * In order to reduce overhead of saving irrelevant data for different shapes
     * @param {object} data
     * @returns {object} result
     */
    getShapeData = data => {
        const result = {
            shape: data.shape,
            x: data.x,
            y: data.y,
            color: data.color,
            board_id: data.board_id,
            shouldAddBoard: data.shouldAddBoard
        };
        switch (data.shape) {
            case "TRIANGLE":
            case "CIRCLE":
                result.radius = data.radius;
                break;
            case "RECT":
                result.width = data.width;
                result.height = data.height;
                break;
            case "TEXT":
                result.text = data.text;
                break;
            default:
        }
        return result;
    };

    canAddShape = () => {
        return (this.state.shapesCreated < this.state.maxShapes);
    };

    onCanvasClick = (event) => {
        if (this.canAddShape()) {
            const data = this.getShapeData({
                x: event.evt.layerX,
                y: event.evt.layerY,
                color: this.state.color,
                shape: this.state.selectedShape,
                width: this.state.width,
                height: this.state.height,
                text: this.state.text,
                radius: this.state.radius,
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
                                    this.setState({managerAlertVisible: true});
                                });
                            }
                        });
                });
        }
        else {
            this.setState({maxShapesAlertVisible: true});
        }
    };

    dismissAlert = () => {
        this.setState({managerAlertVisible: false, deleteAlertVisible: false, maxShapesAlertVisible: false});
    };

    render() {
        console.log(this.state.maxShapes, this.state.shapesCreated);
        return (
            <div id="outer-container">
                {this.state.deleteModalVisible &&
                <DeleteModal
                    onDeleteModalClose={this.onDeleteModalClose}
                    handleDelete={this.handleDelete}/>
                }
                <header>
                    {this.state.isManager &&
                    <div className={'button-wrap'}>
                        <Button onClick={this.onClickDelete} size={"sm"} variant={"danger"}
                                disabled={this.state.existingShapes.length === 0}>
                            Delete all shapes :(
                        </Button>
                    </div>}
                    <span>
                        <Alerts
                            deleteAlertVisible={this.state.deleteAlertVisible}
                            maxShapesAlertVisible={this.state.maxShapesAlertVisible}
                            managerAlertVisible={this.state.managerAlertVisible}
                            onClose={this.dismissAlert}
                        />
                        Board {this.props.boardId} {this.state.isManager && '(manager)'} </span>
                    <div className={'shapes-remaining'} style={{color: this.state.color}}>
                        Shapes created today: {this.state.shapesCreated} out of {this.state.maxShapes}
                    </div>
                </header>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
                         color={this.state.color}
                         height={this.state.height}
                         width={this.state.width}
                         text={this.state.text}
                         radius={this.state.radius}
                         selectedShape={this.state.selectedShape}
                         setShape={this.setShape}
                         setColor={this.setColor}
                         onWidthChange={this.onWidthChange}
                         onHeightChange={this.onHeightChange}
                         onRadiusChange={this.onRadiusChange}
                         onTextChange={this.onTextChange}
                />
                <div id="page-wrap">
                    <CanvasContainer
                        onCanvasClick={this.onCanvasClick}
                        existingShapes={this.state.existingShapes}
                    />
                </div>
            </div>
        );
    }
}

export default Canvas;