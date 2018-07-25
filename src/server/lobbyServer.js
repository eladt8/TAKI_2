const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('./auth');

const players = [];
const gameRooms = [];

const lobby = express.Router();

lobby.route('/')
    .get(auth.userAuthentication, (req, res) => {
        res.json(players);
    })