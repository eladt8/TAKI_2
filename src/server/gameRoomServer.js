const express = require('express');
const lobby = require('./lobbyServer');

const gameRoom = express.Router();

// lobby.fetchRoomByID();

gameRoom.get('/', (req, res) => {
let gameToReturn =lobby.fetchRoomByID(req.session.id);
    res.json({gameToReturn});
});

lobby.post('/takeCardFromDeck', (req, res) => {//todo:do the
    let game = fetchRoom(req.body);

    if (game && addPlayerToGameRoom(req.session.id, game.roomName)) {
        res.sendStatus(200);
    }
    else {
        res.status(403).send('the room is already full or not found');
    }
});

// function addGameToGameRoomsList(roomName,creator ,numplayers)
// {
// const logic =new gameLogic(numplayers,creator);
// gameRoomsList.push({roomName:roomName,logic:logic});
// }
module.exports = gameRoom;
