class FullDeck {
    constructor() {
        this.color = ['green', 'red', 'yellow', 'blue'];
        this.rank = ['1', '3', '4', '5', '6', '7', '8', '9'];
        this.cards2OfEach = ['2+', '+', 'Stop', 'Taki'];
        this.changeColor = ['cc'];
        this.superTaki = ['st'];
        this.cards = [];

        this.init();
        this.shuffle();
    }


    init ()//todo: add cardGroup to the cards
    {
        this.cards = [];
        var colorlen = this.color.length;
        var rankLen = this.rank.length;
        var cards2OfEachLen = this.cards2OfEach.length;
        var i, j, k;
        var id = 1;
        var imageType = ".png"
        var url = "../src/components/resources/";
        for (k = 0; k < 2; k++) //init the numbers and this color total 8*4*2 = 64 cards
            for (i = 0; i < colorlen; i++)
                for (j = 0; j < rankLen; j++) {
                    this.cards.push({
                        type: this.rank[j],
                        color: this.color[i],
                        id: id,
                        cardClass: "number",
                        imgSource:this.color[i]+this.rank[j] +imageType
                    });
                    id = id + 1;
                }
        for (k = 0; k < 2; k++) //init the 2+,+,stop,taki cards and this color total 4*4*2 = 32 cards
            for (i = 0; i < colorlen; i++)
                for (j = 0; j < cards2OfEachLen; j++) {
                    this.cards.push({
                        type: this.cards2OfEach[j],
                        color: this.color[i],
                        id: id,
                        cardClass: "color action",
                        imgSource:this.color[i]+ this.cards2OfEach[j] +imageType
                    });
                    id = id + 1;
                }
        for (i = 0; i < 4; i++) {
            this.cards.push({
                type: this.changeColor[0],
                color: null,
                id: id,
                cardClass: "change color",
                imgSource:this.changeColor[0] + imageType
            });
            id = id + 1;
        }

        for (i = 0; i < 2; i++) {
            this.cards.push(
                {
                    type: this.superTaki[0],
                    color: null,
                    id: id,
                    cardClass: "super Taki",
                    imgSource:this.superTaki[0] + imageType
                });
            id = id + 1;
        }
    };

    shuffle () {
        var currentIndex = this.cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    };

}
module.exports = FullDeck;
// const Deck = new FullDeck();
// export default Deck;