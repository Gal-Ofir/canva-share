import React from "react";
import {Alerts} from "../Alerts/Alerts";
import {Button} from "react-bootstrap";

class CanvasHeader extends React.Component {

    navHome = () => {
        document.location.href = "/";
    };

    render() {
        return (
            <div className={'header'} style={{fontSize: Math.floor(this.props.parentWidth * 0.015)}}>
                <Alerts
                    alertType={this.props.alertType}
                    onClose={this.props.dismissAlert}
                />
                <div className={'button-wrap'}>
                    <Button onClick={this.navHome} size={"sm"} variant={"secondary"} style={{marginRight: '2px'}}>
                        Home
                    </Button>
                    {this.props.isManager &&
                    <Button onClick={this.props.onClickDelete} size={"sm"} variant={"danger"}
                            disabled={this.props.disabled}>
                        Delete all shapes :(
                    </Button>
                    }
                </div>
                <span>
                        Board {this.props.boardId} {this.props.isManager && '(manager)'} </span>
            </div>
        );
    }
}

export default CanvasHeader;