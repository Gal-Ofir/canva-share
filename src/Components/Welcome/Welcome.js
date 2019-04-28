import React from "react";
import "./Welcome.css";
import {getAllBoards} from "../../utils/http";
import AddBoardModal from "../Modals/AddBoardModal";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            addBoardModalVisible: false
        };
    }

    componentDidMount = () => {
        getAllBoards()
            .then(boards => {
                this.setState({boards: boards.data})
            });
    };

    handleCreateNewClick = (event) => {
        event.preventDefault();
        this.setState({addBoardModalVisible: true})
    };


    onAddBoardModalClose = () => {
        this.setState({addBoardModalVisible: false});
    };

    render() {
        return <>
            <AddBoardModal
                addBoardModalVisible={this.state.addBoardModalVisible}
                onAddBoardModalClose={this.onAddBoardModalClose}
                existingBoards={this.state.boards}/>
                <div className={'welcome-message'}>
                    Welcome to Canva-Share!
                    <div className={'welcome-submessage'}>
                        Pick an existing board or create a new one and get started with your friends
                    </div>
                </div>
            <div className={"canvas"} onClick={this.handleCreateNewClick}><span>Create new...</span></div>
            {this.state.boards.length > 0 && this.state.boards.map((board, i) => {
                return (<a key={i} href={`/${board}`}>
                        <div className={'canvas'}>
                            <span>{board}</span>
                        </div>
                </a>);
            })}
        </>;
    }
}

export default Welcome;
