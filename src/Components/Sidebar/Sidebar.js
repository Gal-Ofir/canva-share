import {slide as Menu} from 'react-burger-menu'
import React from "react";
import "./Sidebar.css";

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
                marginBottom: Math.floor(this.props.parentHeight / 20)
            }
        }
    };

    getTriangleStyle = () => {
        return {
            borderBottom: `${Math.floor(this.props.parentWidth * 0.02)}px solid ${this.props.color}`,
            width: 0,
            height: 0,
            borderTop: `${Math.floor(this.props.parentHeight * 0.01)}px solid transparent`,
            borderLeft: `${Math.floor(this.props.parentWidth * 0.015)}px solid transparent`,
            borderRight: `${Math.floor(this.props.parentWidth * 0.015)}px solid transparent`,
            padding: 0,
            marginLeft: '32%',
            marginTop: `${Math.floor(this.props.parentHeight / 8)}`,
        };
    };

    getTextStyle = () => {
        return {
            color: this.props.color,
                fontSize: this.props.parentHeight / 35,
            width: Math.floor(this.props.parentWidth * 0.05),
            marginBottom: '5%'
        };
    };

    handleShapeClick = (event) => {
        this.props.setShape(event.target.id.toUpperCase());
    };

    render() {
        return (
            <Menu disableAutoFocus height={'100%'} width={'18%'} styles={this.getStyles()} noOverlay isOpen={true}
                  disableCloseOnEsc>
                {this.props.children}
                <div id={"rect"} className={"rect"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>
                <div id={"circle"} className={"circle"} style={{backgroundColor: this.props.color}}
                     onClick={this.handleShapeClick}>{""}</div>
                <div id={"triangle"} style={this.getTriangleStyle()}
                     onClick={this.handleShapeClick}>{""}</div>
                <div id={"text"} className={"text"}
                     style={this.getTextStyle()}
                     onClick={this.handleShapeClick}>Text
                </div>
                {this.props.shapePicker || <div/>}
            </Menu>
        );
    }
}

export default Sidebar;