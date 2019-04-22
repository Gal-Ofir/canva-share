import {Alert} from "react-bootstrap";
import React from "react";


class Alerts extends React.Component {

    render() {
        return (
            <div>
                <Alert onClose={this.props.onClose} dismissible variant="danger" show={this.props.deleteAlertVisible}>
                    <Alert.Heading>Oh my!</Alert.Heading>
                    <p>
                        This boards manager has decided to reset all the shapes!
                        Guess you have to start from scratch...
                    </p>
                </Alert>
                <Alert onClose={this.props.onClose} dismissible variant="success" show={this.props.managerAlertVisible}>
                    <Alert.Heading>Why hello!</Alert.Heading>
                    <p>
                        You've been added as a manager for this board. This doesn't give you much...
                        But you can delete the shapes if you like, which is nice.
                    </p>
                </Alert>
                <Alert onClose={this.props.onClose} dismissible variant="warning" show={this.props.maxShapesAlertVisible}>
                    <Alert.Heading>Whoops!</Alert.Heading>
                    <p>
                        You've reached the maximum shapes allowed to create per day. See you tomorrow!
                    </p>
                </Alert>
            </div>
        );
    }
}

export default Alerts;