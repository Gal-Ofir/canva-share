import React from "react";
import "./Welcome.css";
import {getAllBoards} from "./utils/http";
import AddBoardModal from "./Components/Modals/AddBoardModal";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            boards: [],
            addBoardModalVisible: false
        };
        this.inputRef = React.createRef();
    }

    componentWillMount = () => {
        this.updateDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    updateDimensions = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
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
        return <div className={'welcome-container'}>
            <AddBoardModal
                inputRef={this.inputRef}
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
        </div>;
    }
}

export default Welcome;
