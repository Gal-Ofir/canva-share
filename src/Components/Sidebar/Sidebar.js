import {slide as Menu} from 'react-burger-menu'
import React from "react";
import "./Sidebar.css";
import ShapePicker from "../Shapes/ShapePicker"


class Sidebar extends React.Component {


    getStyles = () => {
        return {
            bmBurgerButton: {
                display: 'none'
            },
            bmBurgerBars: {
                display: 'none'
            },
            bmBurgerBarsHover: {
                display: 'none'
            },
            bmCrossButton: {
                display: 'none'
            },
            bmCross: {
                background: '#bdc3c7'
            },
            bmMenuWrap: {
                position: 'absolute'
            },
            bmMenu: {
                overflow: 'hidden'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                padding: '0'
            },
            bmItem: {
                cursor: 'pointer',
                display: 'block',
                padding: '5px',
                marginLeft: '32%',
                marginBottom: Math.floor(this.props.parentHeight / 16)
            }
        }
    };


    handleShapeClick = (event) => {
        this.props.setShape(event.target.id.toUpperCase());
    };

    onChangeComplete = (color) => {
        this.props.setColor(color.hex);
    };

    onChange = (color) => {
        this.props.setColor(color.hex);
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
            <Menu width={'18%'} styles={this.getStyles()} noOverlay isOpen={true} disableCloseOnEsc>
                {this.props.children}
                <div id={"rect"} className={"rect"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>

                <div id={"circle"} className={"circle"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>

                <div id={"triangle"} style={{
                    borderBottom: `${Math.floor(this.props.parentWidth*0.02)}px solid ${this.props.color}`,
                    width: 0,
                    height: 0,
                    borderTop: `${Math.floor(this.props.parentHeight*0.01)}px solid transparent`,
                    borderLeft: `${Math.floor(this.props.parentWidth*0.015)}px solid transparent`,
                    borderRight: `${Math.floor(this.props.parentWidth*0.015)}px solid transparent`,
                    padding: 0,
                    marginLeft: '32%',
                    marginTop: `${Math.floor(this.props.parentHeight / 8)}`,
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