class Player {
    constructor(playerIndex,place) {
        this.playerHand = [];
        this.playerTurnTime = [];
        this.oneCardPlayerCounter = 0;
        this.avgTimeForPlayer = 0;
        this.Iscomputer = false;
        this.playerHandindex = playerIndex;
        this.playerIndex = 0;
        this.isActivePlayer = true;
        this.turnCount = 0;
        this.place = place;
        this.playerName = "";
    }

    getPlayerHandindex(time) {
        return this.playerHandindex
    }

    setPlayerTurnTime(time) {
        this.playerTurnTime.push(time);
    }

    getPlayerTurnTime() {
        return this.playerTurnTime;
    }

    getPlayerHand() {
        return this.playerHand;
    }

    setPlayerHand(Hand) {
        this.playerHand = Hand;
    }

    setCardToHand(Card) {
        this.playerHand.push(Card);
    }

    getPlayerCard(index) {
        return this.playerHand[index];
    }

    setOneCardCounter() {
        this.oneCardPlayerCounter++;
    }

    getOneCardCounter() {
        return this.oneCardPlayerCounter;
    }

    setAvgTime(time) {
        this.avgTimeForPlayer = time;
    }

    getAvgTime() {
        return this.avgTimeForPlayer;
    }

    setIsComputer() {
        this.Iscomputer = true;
    }

    getIsComputer() {
        return this.Iscomputer;
    }
};

module.exports = Player;