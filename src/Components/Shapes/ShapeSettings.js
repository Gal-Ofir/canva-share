import React from "react";
import * as clickOutside from "react-click-outside";
import Form from "../../../node_modules/react-bootstrap/Form";
import Col from "../../../node_modules/react-bootstrap/Col";
import Row from "../../../node_modules/react-bootstrap/Row";

class ShapeSettings extends React.Component {


    handleClick = () => {
        this.setState({show: !this.state.show});
    };

    handleClickOutside() {
        this.props.handleClickOutside();
    }

    resolveShapeModifier = () => {
        switch (this.props.selectedShape) {
            case "CIRCLE":
            case "TRIANGLE":
                return <>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">Radius</Form.Label>
                        <Col sm={"6"}>
                            <Form.Control onChange={this.props.onRadiusChange} min={'5'} max={'100'} size="sm" type={"number"} value={this.props.radius || 0}/>
                        </Col>
                    </Form.Group>
                        </>;
            case "TEXT":
                return <>
                    <Form.Group as={Row}>
                        <Form.Label column sm="5">Text</Form.Label>
                        <Col sm={"7"}>
                            <Form.Control onChange={this.props.onTextChange} size="sm" type={"text"} value={this.props.text || ''}/>
                        </Col>
                    </Form.Group>
                </>;
            case "RECT":
            default:
                return <>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">Height</Form.Label>
                        <Col sm={"6"}>
                            <Form.Control onChange={this.props.onHeightChange} min={'5'} max={'100'} size="sm" type={"number"} value={this.props.height || 0}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">Width</Form.Label>
                        <Col sm={"6"}>
                            <Form.Control onChange={this.props.onWidthChange} min={'5'} max={'100'} size="sm" type={"number"} value={this.props.width || 0}/>
                        </Col>
                    </Form.Group>
                </>;
        }
    };

    render() {
        const form = this.resolveShapeModifier();
        return (
            <Form>
                {form}
            </Form>
        );
    }


}

export default clickOutside(ShapeSettings);
