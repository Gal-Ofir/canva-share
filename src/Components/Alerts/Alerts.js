import {Alert} from "react-bootstrap";
import React from "react";
import "./Alerts.css";
import {ALERT_CONTENT} from "./AlertConstants";


class Alerts extends React.Component {

    render() {
        const show = this.props.alertType !== null;
        let alert = '';
        if (show) {
            const {variant, heading, text} = ALERT_CONTENT[this.props.alertType];
            alert =
                <Alert className={'alert-header'} style={{width: document.body.clientWidth}} onClose={this.props.onClose} show dismissible variant={variant}>
                <Alert.Heading>{heading}</Alert.Heading>
                    <p>{text}</p>
                </Alert>;
        }
        return (
            <div>
                {alert}
            </div>
        );
    }
}

export {
    Alerts
};