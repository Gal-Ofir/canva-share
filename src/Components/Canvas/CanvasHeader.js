import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import ButtonGroup from "../../../node_modules/react-bootstrap/ButtonGroup";

class CanvasHeader extends React.Component {

    navHome = () => {
        document.location.href = "/";
    };

    render() {
        return (
            <Row className={'header'}>
                <Col>

                    <div className={'button-wrap'}>
                        <ButtonGroup>
                            <Button onClick={this.navHome} size={"sm"} variant={"secondary"}
                                    style={{marginRight: '2px'}}>
                                Home
                            </Button>
                            {this.props.isManager &&
                            <Button onClick={this.props.onClickDelete} size={"sm"} variant={"danger"}
                                    disabled={this.props.disabled}>
                                Delete all shapes :(
                            </Button>
                            }
                        </ButtonGroup>
                    </div>

                </Col>
                <Col xs={4}>
                    <div>
                        <p> Board {this.props.boardId} {this.props.isManager && '(manager)'} </p>
                        <p style={{fontSize: '0.5em'}}>
                            You have {this.props.maxShapes - this.props.shapesCreated} shapes left today.
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className={"button-wrap"}>
                    {this.props.shapePicker || ""}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default CanvasHeader;