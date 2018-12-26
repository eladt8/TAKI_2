import React from 'react';
import LobbyTable from './lobbyTable.js';

export default class Lobby extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerArr: [],
            gameRoomsArr: [],
            errMessage:"",
            // currentUser: this.props.currentUser,

        };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.updateLobby = this.updateLobby.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
        this.handleSubmitAddGame = this.handleSubmitAddGame.bind(this);
        this.handleDeleteGame = this.handleDeleteGame.bind(this);
    }

    componentWillMount() {
        this.updateLobby();

    }


    render() {
        return (
            <div>
                <h1> Hello {this.props.currentUser}</h1>
                <LobbyTable id="players" content={this.state.playerArr} handleJoinGame={this.handleJoinGame}/>
                <LobbyTable id="gameRooms" content={this.state.gameRoomsArr}
                            handleJoinGame={this.handleJoinGame} handleDeleteGame={this.handleDeleteGame}/>
                <button id="logout-btn" onClick={this.logoutHandler}>Logout</button>
                <form id="create-new-room" onSubmit={this.handleSubmitAddGame}>
                    <label id="game-label" htmlFor="userName"> Name: </label>
                    <input id="game-input" name="gameName"/><br></br>
                    <label id="numplayers-label" htmlFor="numPlayers"> How Many Players (2-4): </label>
                    <input id="numplayers-input" name="numPlayers"/><br></br>
                    <input id="submit-btn btn" type="submit" value="Add Game"/>
                </form>
                {this.renderErrorMessage()}
            </div>
        )
    }

  renderErrorMessage() {
        if (this.state.errMessage) {
            return (
                <div className="login-error-message">
                    {this.state.errMessage}
                </div>
            );
        }
        return null;
    }
    updateLobby() {
        return fetch('/lobby/lobbyTable', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.updateLobby, 200);
                return response.json();
            })
            .then(content => {
                this.setState(() => ({playerArr: content.users, gameRoomsArr: content.Rooms}));
            })
            .catch(err => {
                console.log("ERROR: ",err.message);
            });
    }

    logoutHandler() {
        fetch('/users/logout', {method: 'GET', credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    console.log(`failed to logout user `, response);
                }
                this.setState(() => ({currentUser: {name: ''}, showLogin: true}));
            })
    }

    handleJoinGame(roomName) {
        fetch('/lobby/joinGame', {method: 'POST', body: roomName, credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                {
                    clearTimeout(this.timeoutId);
                    this.props.updateShowGameRoom(roomName, data);
                }
            })
            .catch(err => {
                console.log("ERROR: ",err.message);
            });

    }


handleDeleteGame(roomName)
{
    fetch('/lobby/deleteGame', {method: 'POST', body: roomName, credentials: 'include'})
        .then(response => {
            if (response.ok) {
                console.log("SSSSS");
            } else {
                if (response.status === 403)
                     this.setState(()=> ({errMessage: "Cant delete this room"}));
                console.log("FUCK not good");//todo:write message to the user, like in the logout
            }
        });
    return false;
}
handleSubmitAddGame(e)
{
    e.preventDefault();
    const GameName = e.target.elements.gameName.value;
    const numberOfPlayers = e.target.elements.numPlayers.value;
    document.getElementById("game-input").value = "";
    document.getElementById("numplayers-input").value = "";
        fetch('/lobby/addGame', {
            method: 'POST',
            body: JSON.stringify({GameNames: GameName, numPlayer: numberOfPlayers}),
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    {
                        this.setState(()=> ({errMessage: ""}));
                    }
                } else {
                    if (response.status === 402)
                        this.setState(()=> ({errMessage: "Please enter number between 2-4"}));
                    if(response.status === 403)
                        this.setState(()=> ({errMessage: "Please Enter a valid game name"}));
                }
            });
        return false;
    
}
}
