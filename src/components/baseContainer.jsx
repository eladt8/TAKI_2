import React from 'react';
import LoginModal from './login-modal.jsx';
import Lobby from "./lobby";
import Game from "./gameRoom/gameRoom.js";
import TakiLogic from  '../server/LOGIC/gameLogic.js';


export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            showLogin: true,
            // showGameRoom: false,
            showGameRoom: {show: false, roomName:'',index:''},
            currentUser: {
                name: ''
            }
        };

        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.updateShowGameRoom = this.updateShowGameRoom.bind(this);
        // this.fetchGameRoom=this.fetchGameRoom.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.handleQuitGame =this.handleQuitGame.bind(this);
        this.handleEndOfGame  =this.handleEndOfGame.bind(this);
    }

    render() {

        if (this.state.showLogin) {
            return (
                <LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError}/>)
        }
        else if (this.state.showGameRoom.show) {
            return ( <Game index = {this.state.showGameRoom.index} quitGame = {this.handleQuitGame} endGame = {this.handleEndOfGame}/>);
            // return this.renderGameRoom();
            }
        else
            {
                //
                return this.renderLobby();

            }
        }

    updateShowGameRoom(name,index) {
        // this.setState(() => ({showGameRoom: true}));
        let showRoom = {show: true, roomName:name,index:index};
        this.setState(() => ({showGameRoom: showRoom }));
    }

    handleSuccessedLogin() {
        this.setState(() => ({showLogin: false}), this.getUserName);
    }

    handleLoginError() {
        console.error('login failed');
        this.setState(() => ({showLogin: true}));
        
    }
    handleQuitGame()
    {
        console.log('Player Exit The Game Room'); 
        let showRoom = {show: false, roomName:'',index:''};
        this.setState(()=>({showGameRoom: showRoom}));
    }
    handleEndOfGame()
    {
        console.log('GameEnded');
        let showRoom = {show: false, roomName:'',index:''};
        this.setState(()=>({showLogin: false,showLogin: showRoom}))
    }

    renderLobby() {
        return (
            <Lobby currentUser={this.state.currentUser.name} updateShowGameRoom={this.updateShowGameRoom}/>
        )
    }

    getUserName() {
        this.fetchUserInfo()
            .then(userInfo => {
                this.setState(() => ({currentUser: userInfo, showLogin: false}));
            })
            .catch(err => {
                if (err.status === 401) { // incase we're getting 'unautorithed' as response
                    this.setState(() => ({showLogin: true}));
                } else {
                    throw err; // in case we're getting an error
                }
            });
    }

    fetchUserInfo() {
        return fetch('/users', {method: 'GET', credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            });
    }

    fetchGameRoom() {
        // renderGameRoom(){
      fetch('/lobby/showRoom', {method: 'GET', credentials: 'include'})
    .then((response) => {
            if (!response.ok) {
                throw response;
            }
            console.log({response});
            return response.json();
        })
         .then(data =>{
         console.log("data from fetch game:",data.roomName);
            return data;
        // return (<Game GameRoomProps={data.roomName}/>);
    })
         .catch(err =>{
             console.log("error:", err.message);
         })
    }
    

    renderGameRoom() {
        let gameRoom;
        gameRoom = this.fetchGameRoom();
        if (gameRoom)
        {
            console.log(gameRoom.roomName);
            return (<Game GameRoomProps={gameRoom.roomName}/>);

        }
    }
}





