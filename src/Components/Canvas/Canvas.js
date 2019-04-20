import React from "react";
import CanvasContainer from "./CanvasContainer";
import Sidebar from '../Sidebar/Sidebar';


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
            text: 'Text'
        }
    }

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

    render() {
        return (
            <div id="outer-container">
                <header>Welcome to {this.props.canvasRoom}</header>
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