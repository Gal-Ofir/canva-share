import {slide as Menu} from 'react-burger-menu'
import React from "react";
import "./Sidebar.css";
import ShapePicker from "../Shapes/ShapePicker"

const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px',
    },
    bmBurgerBars: {
        background: 'rgb(148, 168, 255)'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
        marginLeft: '80%'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        width: '20%'
    },
    bmMenu: {
        background: 'rgb(148, 168, 255)',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        width: '100%',
        overflow: 'hidden'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmItem: {
        cursor: 'pointer',
        display: 'block',
        padding: '5px',
        marginLeft: '32%',
        marginBottom: '20%'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};


class Sidebar extends React.Component {


    handleShapeClick = (event) => {
        const cursor = event.target.id === "text" ? "default" : event.target.id;
        const selectedShape = event.target.id.toUpperCase();
        this.props.setShapeAndCursor(selectedShape, cursor);
    };

    onChangeComplete = (color) => {
        this.props.setColor(color.hex)
    };

    onChange = (color) => {
        this.props.setColor(color.hex)
    };

    onTextChange = (event) => {
        this.props.onTextChange(event.target.value);
    };

    onRadiusChange = (event) => {
        this.props.onRadiusChange(event.target.value);
    };

    onWidthChange = (event) => {
        this.props.onWidthChange(event.target.value);
    };
    onHeightChange = (event) => {
        this.props.onHeightChange(event.target.value);
    };


    render() {
        return (
            <Menu styles={styles} noOverlay>

                <div id={"rect"} className={"rect"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>

                <div id={"circle"} className={"circle"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>

                <div id={"triangle"} className={"triangle"} style={{
                    borderBottom: `50px solid ${this.props.color}`, padding: 0,
                    marginLeft: '30%',
                    marginTop: '-11%'
                }}
                     onClick={this.handleShapeClick}>{""}</div>

                <div id={"text"} className={"text"} style={{color: this.props.color}}
                     onClick={this.handleShapeClick}>Text
                </div>
                <ShapePicker
                    text={this.props.text}
                    radius={this.props.radius}
                    height={this.props.height}
                    width={this.props.width}
                    color={this.props.color}
                    onChange={this.onChange}
                    shape={this.props.selectedShape}
                    onChangeComplete={this.onChangeComplete}
                    onWidthChange={this.onWidthChange}
                    onHeightChange={this.onHeightChange}
                    onTextChange={this.onTextChange}
                    onRadiusChange={this.onRadiusChange}/>

            </Menu>
        );
    }
}

export default Sidebar;