import {Button, Modal} from "react-bootstrap";
import React from "react";


class DeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }


    handleClose = () => {
        this.props.onDeleteModalClose();
    };

    handleDelete = () => {
        this.setState({disabled: true});
        this.props.handleDelete(() => {
            this.setState({disabled: false})
        });
    };

    render() {
        const {disabled} = this.state;
        return (
            <Modal show={this.props.deleteModalVisible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>This action is permanent, and cannot be undone.
                    </div><div>
                    Are you sure you wish to delete all shapes from
                    this board?
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.handleDelete}>
                        {disabled ? 'In progress...' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
    );
    }
    }

    export default DeleteModal;