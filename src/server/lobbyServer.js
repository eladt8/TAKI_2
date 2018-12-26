const express = require('express');
const auth = require('./auth');
// const gameRoom =require('./gameRoom');
const TakiLogic = require('./LOGIC/gameLogic');

const gameRooms = [];

let usersList = [];

const lobby = express.Router();


function GameRoom(roomName, creatorName, creatorID, numberOfPlayers) {
    // constructor(roomName, creatorName, numberOfPlayers) {
    this.id;
    this.roomName = roomName;
    this.creatorID = creatorID;
    this.creator = creatorName;
    this.numberOfPlayers = parseInt(numberOfPlayers);
    this.activePlayers = 0;
    this.isActive = false;
    this.logic = new TakiLogic(numberOfPlayers, creatorName);
    this.listOfPlayers = [];//todo: set the list of active player, and methods
}

function removePlayerFromGame(sessionID,index)
{
    for (game in gameRooms) {
        for (Sid in gameRooms[game].listOfPlayers)
            if (gameRooms[game].listOfPlayers[Sid].id === sessionID) {
                {
                    gameRooms[game].listOfPlayers[Sid].id =undefined;
                    gameRooms[game].activePlayers--;
                    if(gameRooms[game].activePlayers == 0)
                        {
                            gameRooms[game].isActive = false;
                            gameRooms[game].logic = null;
                            gameRooms[game].logic = new TakiLogic(gameRooms[game].numberOfPlayers,gameRooms[game].creator);
                            gameRooms[game].listOfPlayers = [];
                        }
                }
                return gameRooms[game];
            }
    }
    return false;
}

function fetchRoom(roomName) {

    for (game in gameRooms) {
        if (gameRooms[game].roomName === roomName) {
            return gameRooms[game];
        }
    }
    return false;
}

function fetchRoomByID(sessionID) {

    for (game in gameRooms) {
        for (Sid in gameRooms[game].listOfPlayers)
            if (gameRooms[game].listOfPlayers[Sid].id === sessionID) {
                if(parseInt(gameRooms[game].numberOfPlayers) == gameRooms[game].listOfPlayers.length && !gameRooms[game].isActive)
                    {
                        gameRooms[game].isActive = true;
                        gameRooms[game].logic.turnTime = Math.round(new Date().getTime() / 1000);
                    }
                return gameRooms[game];
            }
    }
    return false;
}

function fetchPlayerIndexByID(sessionID) {
    let game = fetchRoomByID(sessionID);
    for (player in game.listOfPlayers) {
        if (game.listOfPlayers[player].id === sessionID) {
            return player;
        }
    }
    return -1;


}

function addPlayerToGameRoom(sessionID, gameRoom) {
    room = fetchRoom(gameRoom);
    if (room.activePlayers < room.numberOfPlayers) {
        room.listOfPlayers.push({id: sessionID, name: auth.getUserInfo(sessionID).name, index: room.activePlayers});
        room.logic.Players[room.activePlayers].playerIndex = room.activePlayers;//set the player index in the logic
        room.logic.Players[room.activePlayers].playerName = auth.getUserInfo(sessionID).name;
        room.activePlayers++;
        return true;
    }
    else
        return false;
}

lobby.get('/lobbyTable', auth.userAuthentication, (req, res) => {
    usersList = auth.getUserList();
    res.json({Rooms: gameRooms, users: usersList});
});

lobby.get('/showRoom', auth.userAuthentication, (req, res) => {
    let game = fetchRoomByID(req.session.id);
    if (game) {
        console.log("show room print:", game.roomName);
        res.json(game);
    }
    else {
        res.status(403).send('the room do not exist');
    }
});

lobby.post('/joinGame', (req, res) => {//todo:do the
    let game = fetchRoom(req.body);
    if (game && addPlayerToGameRoom(req.session.id, game.roomName)) {
        let index = fetchPlayerIndexByID(req.session.id);
        res.json(index);
        // res.status(200).send({index});
    }
    else {
        res.status(403).send('the room is already full or not found');
    }
});

lobby.post('/addGame', auth.addGameToAuthList, (req, res) => {
    const gameName = JSON.parse(req.body).GameNames;
    const numPlayer = JSON.parse(req.body).numPlayer;
    if (!(numPlayer === "2" || numPlayer === "3" || numPlayer === "4")) 
    { 
      res.status(402).send("Please enter number between 2-4");
    }
    else if(gameName === "")
    {
        res.status(403).send("Please Enter a valid game name")
    }
    else
    {   usersList = auth.getUserList();
        const userName = auth.getUserInfo(req.session.id).name;
        const newGame = new GameRoom(gameName, userName, req.session.id, numPlayer);
        gameRooms.push(newGame);
        res.sendStatus(200);
    }
});


lobby.post('/deleteGame', auth.removeGame, (req, res) => {
    let deleted = false;
    for (game in gameRooms) {
        if (gameRooms[game].roomName === req.body && gameRooms[game].creatorID === req.session.id && !gameRooms[game].isActive) {
            delete gameRooms[game];
            deleted = true;
        }
    }
    if (deleted)
        res.sendStatus(200);
    else
        res.status(403).send("Cant delete this room");
});

// --------------------------------------------------------------
lobby.get('/getGame', (req, res) => {
    let gameToReturn = fetchRoomByID(req.session.id);
    res.json({gameToReturn});
});

lobby.post('/takeCardFromDeck', (req, res) => {
    let game = fetchRoomByID(req.session.id);
    let index = fetchPlayerIndexByID(req.session.id);// אפשר גם להשתמש באינדקס מהבקשת שרת, יש לקומפוננטה
    let answerFromTakeCardFromDeck = game.logic.takeCardFromDeck(index);
    if (index >= 0 && ( answerFromTakeCardFromDeck == true)) {
        res.sendStatus(200);
    }
    else 
    {
        if(answerFromTakeCardFromDeck == 2)
        {
            res.status(402).status('You got a card you can play with')
        }
        else
            res.status(403).send('error');
    }
});

lobby.post('/clickOnColorPikcker', (req, res) => {
    let game = fetchRoomByID(req.session.id);
    let index = fetchPlayerIndexByID(req.session.id);// אפשר גם להשתמש באינדקס מהבקשת שרת, יש לקומפוננטה
    if (index >= 0 && game.logic.clickOnColorPikcker(index,JSON.parse(req.body).CCP)) {

        res.sendStatus(200);
    }
    else {
        res.status(403).send('error');
    }
});

lobby.post('/closedTaki', (req, res) => {
    let game = fetchRoomByID(req.session.id);
    let index = fetchPlayerIndexByID(req.session.id);// אפשר גם להשתמש באינדקס מהבקשת שרת, יש לקומפוננטה
    if (index >= 0 && game.logic.closedTaki(index)
    ) {
        res.sendStatus(200);
    }
    else {
        res.status(403).send('error');
    }
});

lobby.post('/quitAction', (req, res) => {
    let game = fetchRoomByID(req.session.id);
    let index = fetchPlayerIndexByID(req.session.id);// אפשר גם להשתמש באינדקס מהבקשת שרת, יש לקומפוננטה
    if (index >= 0 && game.logic.quitAction(index)) {
        removePlayerFromGame(req.sessionID,index);
        res.sendStatus(200);
    }
    else {
        res.status(403).send('error');
    }
});
lobby.post('/pickCard', (req, res) => {
    let game = fetchRoomByID(req.session.id);
    let index = fetchPlayerIndexByID(req.session.id);// אפשר גם להשתמש באינדקס מהבקשת שרת, יש לקומפוננטה
    const card = JSON.parse(req.body).card;
    if(game.logic.Players[index].isActivePlayer){
        if (index >= 0 && game.logic.pickCard(index, card))
        {
        res.sendStatus(200);
        }
    }
    else {
        res.status(403).send('error');
    }

lobby.get('/getStatics', auth.userAuthentication, (req, res) => {
        let game = fetchRoomByID(req.session.id);
        if (game) {
            console.log("show room print:", game.roomName);
            res.json(game.logic.Players);
        } else {
            res.status(403).send('the room do not exist');
        }
    });

});
module.exports = lobby;
