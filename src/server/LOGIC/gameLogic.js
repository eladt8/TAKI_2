// import Deck from "./Deck"
const FullDeck = require('./Deck');
const Player = require('./Player');

class TakiLogic {
    constructor(numberOfPlayer, creatorsName) {
        this.numberOfPlayers = numberOfPlayer;
        this.creatorName = creatorsName;
        this.messageToShow = null;
        this.numberOfActivePlayers = numberOfPlayer;
        this.playerTurn = 0;
        this.Players = [];
        this.discardPile = [];
        this.changeTurn = false;
        this.countPlus2 = 0;
        this.isTaki = false;
        this.closedTakiButton = false;
        this.isPlus2 = false;
        this.isPlus = false;
        this.turnCount = 0;
        this.turnTime = 0;
        this.deck = new FullDeck;

        this.gameNumber = 1;
        this.isCC = false;
        this.isStop = false;
        this.UIFunc;
        this.brute;
        this.sec = 0;
        this.toSaveHistory = 0;
        this.isWon = 0;

        this.createPlayers();
        this.dealCards();


    }
    createPlayers() {
        for (var i = 0; i < this.numberOfPlayers; i++)
            this.Players.push(new Player(i,parseInt(this.numberOfPlayers)));
    }
    getPlayers() {
        return this.Players;
    }
    getPlayer(index) {
        return this.Players[index];
    }
    getPlayer() {
        return this.Players[this.playerTurn];
    }
    getPlayer(index) {
        return this.Players[index];
    }
    getIsComputerPlayer() {
        return this.Players[this.playerTurn].getIsComputer();
    }
    getPlayerHand() {
            return this.Players[this.playerTurn].getPlayerHand();
        }
        // getPlayerHandByIndex(index)
        // {
        //     return this.Players[index].getPlayerHand();
        // }
    setPlayerCard(Card) {
        this.Players[this.playerTurn].setCardToHand(Card);
    }
    getPlayerCard(index) {
        return this.Players[this.playerTurn].getPlayerCard(index);
    }
    setOneCard(index) {
        this.Players[index].setOneCardCounter();
    }
    getOneCardPlayer(index) {
        return this.Players[index].getOneCardCounter();
    }
    setAvgTime(index, Time) {
        this.Players[index].setAvgTime(Time);
    }
    getAvgTime(index) {
        return this.Players[index].getAvgTime();
    }
    setisWon() {
        this.isWon = 1;
    }
    getIsWon() {
        return this.isWon;
    }
    updateUIFunc(func) {
        // this.UIFunc = func;
    }
    bruteForce(func) {
        // this.brute = func
    }
    bruteUpdateUI() {
        // this.brute();
    }
    updateUI() {
        // this.UIFunc(this);
    }

    getmessageToShow() {
        return this.messageToShow;
    }

    getgameNumber() {
        return this.gameNumber;
    }
    getisCC() {
        return this.isCC;
    }
    getisStop() {
        return this.isStop;
    }
    getdeck() {
        return this.deck;
    }
    getclosedTakiButton() {
        return this.closedTakiButton;
    }
    getisPlus2() {
        return this.isPlus2;
    }
    getisPlus() {
        return this.isPlus;
    }
    getplayerTurn() {
        return this.playerTurn;
    }
    getturnCount() {
        return this.turnCount;
    }
    getturnTime() {
        return this.turnTime;
    }
    getdiscardPile() {
        return this.discardPile;
    }
    getchangeTurn() {
        return this.changeTurn;
    }
    getcountPlus2() {
        return this.countPlus2;
    }
    getisTaki() {
            return this.isTaki;
        }
        //deal cards at the start of the game




    dealCards() {

        // Deal cards to computer and player
        for (var j = 0; j < this.numberOfPlayers; j++) {
            for (var i = 0; i < 8; i++) {
                this.Players[j].setCardToHand(this.deck.cards.shift());
            }
        }
        // If top card of deck is wild move it to bottom of deck !!need to add all the special cards!
        while (this.deck.cards[0].type != '1' && this.deck.cards[0].type != '3' && this.deck.cards[0].type != '4' && this.deck.cards[0].type != '5' && this.deck.cards[0].type != '6' && this.deck.cards[0].type != '7' && this.deck.cards[0].type != '8' && this.deck.cards[0].type != '9') {
            var x = this.deck.cards.shift();
            this.deck.cards.push(x);
        }
        // Make discard pile
        this.discardPile.push(this.deck.cards.shift());

    }


    dddd() //function to create specific hand
        {
            var found1 = false;
            var found2 = false;
            var found = found1 && found2;
            for (var i = 0; i < this.deck.cards.length && !found; i++) {
                if ((this.deck.cards[i].type == "cc") && !found1) {
                    found1 = true;
                    this.computerHand.push(this.deck.cards[i])
                }
                if ((this.deck.cards[i].type == "Stop") && !found2) {
                    found2 = true;
                    this.playerHand.push(this.deck.cards[i])
                }
                found = found1 && found2;
            }

            while (this.deck.cards[0].type != '1' && this.deck.cards[0].type != '3' && this.deck.cards[0].type != '4' && this.deck.cards[0].type != '5' && this.deck.cards[0].type != '6' && this.deck.cards[0].type != '7' && this.deck.cards[0].type != '8' && this.deck.cards[0].type != '9') {
                var x = this.deck.cards.shift();
                this.deck.cards.push(x);
            }
            this.discardPile.push(this.deck.cards.shift());


        }


    updateMessage(msg) {

        this.messageToShow = msg;
        

    }


    //NEDD TO UPDATEEEE
    changePlayerTurn() {
        if (this.Players[this.playerTurn].playerHand.length == 1) {
            this.Players[this.playerTurn].setOneCardCounter();
        }
        if (this.Players[this.playerTurn].playerHand.length == 0 && !this.isPlus && !this.isCC && !this.isTaki) //if some player won
        {
            this.Players[this.playerTurn].isActivePlayer = false;
            this.numberOfActivePlayers--;
            this.Players[this.playerTurn].place = this.numberOfPlayers - this.numberOfActivePlayers;
            if (this.numberOfActivePlayers == 1)
            {
                this.isWon = 1;
                for(player in this.Players)
                    this.Players[player].isActivePlayer = false;
            }
        }
        if (this.changeTurn == true) {
            this.calcStatistics();
            this.Players[this.playerTurn].turnCount++;
            this.turnTime = Math.round(new Date().getTime() / 1000);
            if (this.isStop) {
                this.playerTurn = (this.playerTurn + 2) % this.numberOfPlayers;
                this.isStop = false;
            } else {
                this.playerTurn = (this.playerTurn + 1) % this.numberOfPlayers;
            }
            while (!this.Players[this.playerTurn].isActivePlayer && this.isWon == 0) {
                this.playerTurn = (this.playerTurn + 1) % this.numberOfPlayers;
            }
            this.updateMessage(null);
            this.changeTurn = false;
            this.turnCount++;
            // this.updateUI();
            // this.bruteUpdateUI();
        }


    }

    //V
    calcStatistics() {
        var sumTP = 0; //sum time for player
        var avgP = 0; //avg for player
        var avgS = 0; //avg for all player games
        var sumNumber = 0; //sum for all player games.
        var thisTurnTime = Math.round(new Date().getTime() / 1000);
        this.Players[this.playerTurn].playerTurnTime.push(thisTurnTime - this.turnTime);
        if (this.Players[this.playerTurn].playerTurnTime.length != 0) {
            for (var i = 0; i < this.Players[this.playerTurn].playerTurnTime.length; i++) {
                sumTP += this.Players[this.playerTurn].playerTurnTime[i];
            }
            avgP = (sumTP) / (this.Players[this.playerTurn].playerTurnTime.length);
        } else {
            avgP = 0;
        }

        this.setAvgTime(this.playerTurn, avgP);
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVV
    pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVV
    checkValidCard(cardObj) { //todo: check valid of card on pile
        var topOfDiscardPile = this.discardPile[0];
        var res = 0;

        if (topOfDiscardPile.color == cardObj.color || topOfDiscardPile.type == cardObj.type || cardObj.type == "cc" || cardObj.type == "st")
            res = 1;

        return res;
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVV
    pickCard(index, cardObject) {
        if (index == this.playerTurn) {
            if (this.isPlus2) {
                if (cardObject.type != "2+") //if there is an active +2 card and the player picked a card diffrenet from +2
                {
                    this.updateMessage("there is an active 2+ card. please select 2+ card or draw " + this.countPlus2 * 2 + " cards from board");
                    this.changeTurn = false;
                } else {
                    this.countPlus2++;
                    this.moveCardToPile(cardObject);
                    this.changeTurn = true;
                }
            } else if (this.isTaki) { //if "Taki" is active.
                //document.getElementById("deck").setAttribute("style", "pointer-events: none;");
                if (cardObject.color != this.discardPile[0].color) //if trying to put diff color
                    this.updateMessage("please pick cards from the color " + this.discardPile[0].color + " only"); //see what to do here -----------------------------------------
                else {
                    this.moveCardToPile(cardObject); //todo
                }
            } else if (this.isPlus) {
                if (this.checkValidCard(cardObject) == 0) {
                    this.updateMessage("You can only choose card from the color " + this.discardPile[0].color + " or draw a card from deck");
                } else {
                    this.moveCardToPile(cardObject);
                    this.isPlus = false;
                    this.checkActions(cardObject);
                }
            } else if (this.checkValidCard(cardObject) == 1) //if the choice is valid need to send card
            {
                this.moveCardToPile(cardObject);

                this.checkActions(cardObject);
            } else {
                this.updateMessage(index, "You cant play with this card!!");
                return false;
            }

            this.changePlayerTurn();
        } else {
            return false;
        }
        return true;
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVV
    checkActions(card) {
        switch (card.cardClass) {
            case "number":
                {
                    this.changeTurn = true;
                    break;
                }
            case "color action":
                {
                    this.checkColorAction(card);
                    break;
                }
            case "change color":
                {
                    this.isCC = true;
                    break;
                }
            case "super Taki":
                {
                    this.changeTurn = false;
                    this.discardPile[0].color = this.discardPile[1].color;
                    card.color = this.discardPile[1].color;
                    //window.alert("the color of the super taki is :" + card.color);
                    this.isTaki = true;

                    break;
                }
        }
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVV
    closedTaki(index) {
        if (index == this.playerTurn) {
            this.changeTurn = true;
            var element = this.discardPile[0];
            if (element.type != "Taki" && element.type != "st")
                this.checkActions(element);
            this.isTaki = false;
            this.changePlayerTurn();
            return true;
        } else
            return false;

    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV NOTN USE
    changeColor(index) {
        this.isCC = true;
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    clickOnColorPikcker(index, color) {
        if (index == this.playerTurn) {
            this.discardPile[0].color = color;
            this.isCC = false;
            this.changeTurn = true;
            this.updateMessage("The Selected color is " + this.discardPile[0].color.toUpperCase())
            this.changePlayerTurn();
            return true;
        } else
            return false;
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    checkColorAction(card) {
        switch (card.type) {
            case "2+":
                {
                    this.countPlus2++;
                    this.isPlus2 = true;
                    this.changeTurn = true;
                    break;
                }
            case "+":
                {
                    this.changeTurn = false; //need to count as turn
                    this.isPlus = true;
                    this.turnCount++;
                    break;
                }
            case "Stop":
                {
                    this.changeTurn = true; //or should just pop up a window and keep the turn?
                    this.turnCount++;
                    this.updateMessage("STOP card Played!!!")
                    this.isStop = true;
                    break;
                }
            case "Taki":
                {
                    this.changeTurn = false;
                    this.isTaki = true;
                    break;
                }
        }
    }

    //NEED TO CHECK SPLICE MAYBE NEED TO SET THE HAND FROM START
    moveCardToPile(cardToMove) {
        var cardFromHand;
        var found = false;
        for (var i = 0; i < this.Players[this.playerTurn].playerHand.length && !found; i++) {
            if (this.Players[this.playerTurn].playerHand[i].id == cardToMove.id) {
                cardFromHand = this.Players[this.playerTurn].playerHand[i];
                this.Players[this.playerTurn].playerHand.splice(i, 1);
                found = true;
            }
        }
        this.discardPile.unshift(cardFromHand); //add the card to the beginning of the pile
    }


    fillTheDeck() { //take all the card (exept the first) from the pile, shuffle them and make them the new deck
        var card;
        while (this.discardPile.length > 1) {
            this.deck.cards.push(this.discardPile.pop());
        }
        this.deck.shuffle();
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    takeCardFromDeck(index) { //todo: add this func to the deck on click
        var element1;
        var found = false;
        var card;
        if (index == this.playerTurn) {
            for (var i = 0; i < this.Players[this.playerTurn].playerHand.length && !found; i++) {
                if (this.discardPile[0].color == this.getPlayerCard(i).color || this.discardPile[0].type == this.getPlayerCard(i).type) {
                    found = true;
                    card = this.getPlayerCard(i);
                    if (this.isPlus2) {
                        if (this.getPlayerCard(i).type != "2+")
                            found = false;
                    }
                }
            }
            if (!found) {
                {
                    if (this.isPlus2) //if 2+ card is active and the player decided to take cards from deck
                    {
                        for (var i = 0; i < this.countPlus2 * 2; i++) {
                            card = this.deck.cards.shift();
                            if (this.deck.cards.length == 0) {
                                this.fillTheDeck();
                            }
                            this.setPlayerCard(card);
                        }
                        this.isPlus2 = false;
                        this.countPlus2 = 0;
                    } else {
                        card = this.deck.cards.shift();
                        if (this.deck.cards.length == 0) {
                            this.fillTheDeck();
                        }
                        this.setPlayerCard(card);
                    }
                }
                this.isPlus = this.isTaki = this.isStop = this.isCC = false;
                this.changeTurn = true;
                this.toSaveHistory = 1;
            } else {
                this.updateMessage("You have a card you can play with. please choose him. like: " + card.type.toLocaleUpperCase() + " " + card.color.toLocaleUpperCase());
            }
            this.changePlayerTurn();
        } else {
            return false;
        }
        return true;
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    computerPlay() {
        var foundCard = false;
        var pile = this.discardPile[0];
        var cardToPick;

        if (this.isPlus2) {
            for (var i = 0; i < this.computerHand.length && !foundCard; i++) {
                if (this.getPlayerCard(i).type == "2+") {
                    foundCard = true;
                    cardToPick = this.getPlayerCard(i);
                }
            }
            if (!foundCard) {
                this.takeCardFromDeck();
            } else {
                this.countPlus2++;
                this.changeTurn = true;
                this.moveCardToPile(cardToPick);
            }
            this.updateUI();
            // this.bruteUpdateUI();
            this.changePlayerTurn();
        } else if (this.isPlus) {
            for (var i = 0; i < this.getPlayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color) {
                    foundCard = true;
                    cardToPick = this.getPlayerCard(i);
                }
            }
            if (!foundCard) {
                this.takeCardFromDeck();
            } else {
                this.moveCardToPile(cardToPick);
                this.isPlus = false;
                this.changeTurn = true;
                this.updateUI();
                // this.bruteUpdateUI();
                this.changePlayerTurn();
            }

        } else if (this.isTaki) //if taki for computer
        {
            for (var i = 0; i < this.getPlayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color) {
                    foundCard = true;
                    cardToPick = this.getPlayerCard(i);
                }
            }
            if (!foundCard) {
                this.changeTurn = true;
                this.isTaki = false;
            } else {
                this.moveCardToPile(cardToPick);
            }
            this.updateUI();
            // this.bruteUpdateUI();
            this.changePlayerTurn();
        } else {

            for (var i = 0; i < this.getplayerHand().length; i++) { //look for 2+
                if (this.getPlayerCard(i).color == pile.color && this.getPlayerCard(i).type == "2+") {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //look for change color
            for (var i = 0; i < this.getPlayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).type == "cc") {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //look for stop
            for (var i = 0; i < this.getplayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color && this.getPlayerCard(i).type == "Stop") {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //look for +
            for (var i = 0; i < this.getplayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color && this.getPlayerCard(i).type == "+") {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //look for st
            for (var i = 0; i < this.getPlayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).type == "st") {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //look for taki card and another card in the same color
            for (var i = 0; i < this.getplayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color && this.getPlayerCard(i).type == "Taki") {
                    for (var j = 0; j < this.getplayerHand().length && !foundCard; j++)
                        if (this.getPlayerCard(j).type != "Taki" && this.getPlayerCard(j).color == this.getPlayerCard(j).color) {
                            cardToPick = this.getPlayerCard(i);
                            foundCard = true;
                        }
                }
            }
            //look for color
            for (var i = 0; i < this.getplayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).color == pile.color) {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }

            for (var i = 0; i < this.getPlayerHand().length && !foundCard; i++) {
                if (this.getPlayerCard(i).type == pile.type) {
                    cardToPick = this.getPlayerCard(i);
                    foundCard = true;
                }
            }
            //case there is now card
            if (!foundCard) {
                //var hand = document.getElementById("deck");
                //hand.dispatchEvent(new Event('click'));
                this.takeCardFromDeck();
            } else {
                //serch for the button and invoke him

                this.pickCard(cardToPick);
                this.updateUI();
            }

        }
    }


    add() {
        //var text = document.getElementById('stopWatch');
        this.sec++;
        if (this.sec >= 60) {
            this.sec = 0;
            this.min++;
            if (this.min >= 60) {
                this.min = 0;
                this.hour++;
            }
        }

        text.innerText = (this.hour ? (this.hour > 9 ? this.hour : "0" + this.hour) : "00") + ":" + (this.min ? (this.min > 9 ? this.min : "0" + this.min) : "00") + ":" + (this.sec > 9 ? this.sec : "0" + this.sec);
    }



    duration() {
        this.turnTime++;
    }

    startTime() {
        var intr = setInterval(duration(), 1000);
    }




    restartStatics() {

        this.oldPlayerTime += (this.avgTimeForPlayer * this.playerTurnTime.length);
        this.oldPlayerturnsCount += this.playerTurnTime.length;
        this.oldPlayer2Time += (this.avgTimeForPlayer2 * this.computerTurnTime.length);
        this.oldPlayer2turnsCount += this.computerTurnTime.length;
        this.turnCount = 0;
        this.turnTime = 0;
        this.sec = 0;
        this.hour = 0;
        this.min = 0;
        this.playerTurnTime = [];
        this.computerTurnTime = [];
        this.oneCardPlayerCounter = 0;
        this.oneCardComputerCounter = 0;
        this.calcStatistics();
    }


    //NEEd TO CHECK BUT ALL GOOD
    endTheGame() {

        this.closedTakiButton = false;
        this.isPlus = this.isPlus2 = this.isTaki = this.changeTurn = false;
        this.countPlus2 = 0;
        this.isWon = 0;

        this.discardPile = [];
        this.playerTurn = 0;
        this.Players = [];

        this.updateMessage(null);
        this.updateUI();
        this.bruteUpdateUI();
    }

    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    quitAction(index) {
        if (!this.Players[index].isActivePlayer) {
            return true;
        } else
            return false;
    }
}
module.exports = TakiLogic;