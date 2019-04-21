import React from "react";
import CanvasContainer from "./CanvasContainer";
import Sidebar from '../Sidebar/Sidebar';
import {getUserInfo, deleteAllShapesByBoardId} from "../../utils/http";
import {Button} from "react-bootstrap";
import DeleteModal from "./DeleteModal";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: '#fff',
            cursor: '',
            selectedShape: 'RECT',
            height: 50,
            width: 50,
            radius: 30,
            text: 'Text',
            isManager: false,
            deleteModalVisible: false,
            refreshCanvas: false
        }
    }

    componentDidMount = () => {
        getUserInfo()
            .then(user => {
                if (user.data.boards_owned.boards.includes(this.props.canvasRoom)) {
                    this.setState({
                        isManager: true
                    });
                }
            });
    };

    setShapeAndCursor = (selectedShape, cursor) => {
        this.setState({
            cursor,
            selectedShape
        });
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
        deleteAllShapesByBoardId(this.props.canvasRoom)
            .then(() => {
                if (callback) {
                    callback();
                }
                this.setState({deleteModalVisible: false, refreshCanvas: true});

            });
    };

    afterRefreshCanvas = () => {
        this.setState({refreshCanvas: false});
    };

    render() {
        return (
            <div id="outer-container">
                {this.state.deleteModalVisible && <DeleteModal
                    onDeleteModalClose={this.onDeleteModalClose}
                    handleDelete={this.handleDelete}/>
                }
                <header>
                    {this.state.isManager &&
                    <div className={'button-wrap'}><Button onClick={this.onClickDelete} size={"sm"} variant={"danger"}>Delete all shapes :(</Button>
                    </div>}
                    <span>Board {this.props.canvasRoom} {this.state.isManager && '(manager)'} </span>
                </header>
                <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
                         color={this.state.color}
                         height={this.state.height}
                         width={this.state.width}
                         text={this.state.text}
                         radius={this.state.radius}
                         selectedShape={this.state.selectedShape}
                         setShapeAndCursor={this.setShapeAndCursor}
                         setColor={this.setColor}
                         onWidthChange={this.onWidthChange}
                         onHeightChange={this.onHeightChange}
                         onRadiusChange={this.onRadiusChange}
                         onTextChange={this.onTextChange}
                />
                <div id="page-wrap">
                    <CanvasContainer
                        refreshCanvas={this.state.refreshCanvas}
                        afterRefreshCanvas={this.afterRefreshCanvas}
                        color={this.state.color}
                        shape={this.state.selectedShape}
                        cursor={this.state.cursor}
                        width={this.state.width}
                        height={this.state.height}
                        radius={this.state.radius}
                        text={this.state.text}/>
                </div>
            </div>
        );
    }
}

export default Canvas;