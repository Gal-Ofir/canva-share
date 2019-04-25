import {Button, Modal} from "react-bootstrap";
import React from "react";


class AddBoardModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            boardName: '',
            showBoardExistsMessage: false
        };
    }


    handleClose = () => {
        this.props.onAddBoardModalClose();
    };

    handleCreateBoard = () => {
        this.setState({disabled: true});
        if (this.props.existingBoards.includes(this.state.boardName)) {
            this.toggleBoardExistsMessage(true);
        }
        else {
            document.location.href = this.state.boardName;
        }
        this.setState({disabled: false});

    };

    toggleBoardExistsMessage = (toggle) => {
        this.setState({showBoardExistsMessage: toggle});
    };

    handleOnChange = (event) => {
        if (this.state.showBoardExistsMessage) {
            this.toggleBoardExistsMessage(false);
        }
        this.setState({boardName: event.target.value});
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleCreateBoard();
        }
    };

    render() {
        const {disabled, showBoardExistsMessage} = this.state;
        return (
            <Modal show={this.props.addBoardModalVisible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Enter name for new board: </span>
                    <input type={"text"} id={"modalInput"} value={this.state.boardName} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress}/>
                    {showBoardExistsMessage &&
                    <div style={{color: 'red'}}>
                        Board {this.state.boardName} exists already. Please choose a different name.
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleCreateBoard}>
                        {disabled ? 'In progress...' : 'Go!'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddBoardModal;