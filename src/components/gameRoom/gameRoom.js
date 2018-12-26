import React from 'react';
import MessageDiv from "./Message"
import Board from "./Board"
import Satistic from "./statics"


export default class GameRoom extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            logic: null,
            playerIndex: this.props.index,
            message: '',
            isActiveGame: false,
        };
        // this.state.logic.updateUIFunc(this.UIrender.bind(this));
        // this.state.logic.bruteForce(this.renderUIF.bind(this));
        this.updateGame = this.updateGame.bind(this);
        this.renderUIF = this.renderUIF.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.quitAction =this.quitAction.bind(this);
    }

    componentWillMount() {
        this.updateGame();
    }

    componentWillUnmount()
    {
        clearTimeout(this.timeoutId);
    }

    // UIrender(logic) {
    //     this.setState({logic: logic});
    //     this.setState({playerHand: logic.getPlayers()});
    // }
    //
    renderUIF() {
        this.forceUpdate()
    }


    render() {
        if ((this.state.logic === null) || !this.state.isActiveGame ) {
            return (
                <div>
                    <h1>Loading...Waiting to other players</h1>
                </div>
            );
        }
        else
            if (!this.state.logic.isWon)
            {
            return ( <div>
                    <MessageDiv logic={this.state.logic} index={this.state.playerIndex}
                                message={this.getMessage()} active={this.state.isActiveGame} quitAction = {this.quitAction}/>
                    <div id="rivalHandDiv">
                        {this.state.logic.Players.map(this.renderRivalsHand.bind(this))}
                    </div>
                    <Board deck={this.state.logic.deck} index={this.state.playerIndex}/* UIrender={this.UIrender}*/
                           logic={this.state.logic}
                           discardPile={this.state.logic.discardPile} active={this.state.isActiveGame} />

                    <Hand id="PlayerHand" index={this.state.playerIndex}
                          cards={this.state.logic.Players[this.state.playerIndex].playerHand}
                          UIrender={this.renderUIF}
                          logic={this.state.logic}/>

                </div>
            );
        }
        else
        {
            return (
                <div>
                    <Satistic quitAction = {this.quitAction} />
                </div>
            ); 
        }
    }

    renderRivalsHand(player) {

        if (player.playerIndex != null && player.playerIndex != this.state.playerIndex && player.isActivePlayer) {
            return (<Hand id="computerHand" index={player.playerIndex}
                          cards={this.state.logic.Players[player.playerIndex].playerHand}
                /* UIrender={this.UIrender}*/ logic={this.state.logic}/>)
        }


    }

    getMessage() {
        if (this.state.playerIndex == this.state.logic.playerTurn) {
            if (this.state.logic.messageToShow == null) {
                return "its your turn";
            }
            else {
                return this.state.logic.messageToShow;
            }
        }
        else {
                return "wait for your turn";
        }
    }


    updateGame() {
        return fetch('lobby/getGame', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.updateGame, 200);
                return response.json();
            })
            .then(content => {
                if (!((this.state.logic === undefined )))
                    this.setState(() => ({logic: content.gameToReturn.logic,isActiveGame: content.gameToReturn.isActive}));
            })
            .catch(err => {
                throw err
            });
    }

    quitAction()
    {
        clearTimeout(this.timeoutId);
        this.props.quitGame();
    }

}


class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            logic: this.props.logic,
            cards: this.props.cards,
            playerIndex: this.props.index,
        }
    };
     chooseColor() {
         if(!this.props.logic.Players[this.state.playerIndex].isActivePlayer)
         {
            return "#FFD700";
         }
        else if (this.state.playerIndex == this.props.logic.playerTurn) {
          return "#56f436";
        }
        return "#f44336";
      }
    
    createHands(player) {

        return (<span className={this.props.id}>

            {player.playerHand.map(this.createCard.bind(this))}

        </span>)
    }

    createCard(card) {
        let compCard = {imgSource: require("../resources/back.png")};
        let disableCard;
        if (this.props.logic.isWon || this.props.logic.playerTurn != this.state.playerIndex)
            disableCard = "true";
        if (this.props.id == "PlayerHand") {
            return <Card cardObj={card} index={this.props.index} logic={this.props.logic} visibale={disableCard} render = {this.props.UIrender}/>;
        }
        else {
            return <Card cardObj={compCard} index={this.props.index} logic={this.props.logic} visibale={disableCard}/>;
        }
    }

    playerIndex()
    {
        return parseInt(this.state.playerIndex) + 1;
    }

    render() {
        return ( <div className="hand">
                <span>
                {this.props.cards.map(this.createCard.bind(this))}
                </span>
                <button className="playerIndex" style={{background: this.chooseColor()}} >PLAYER: {this.playerIndex()}</button>
            </div>
        );
     
    }
};


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardObj: this.props.cardObj,
        };

    }

    render() {
        return (
            <button id={this.props.cardObj.id} onClick={this.cardHandleClick.bind(this)} disabled={this.props.visibale}>
                {<img src={this.props.cardObj.imgSource}/>/*todo:fix the img problem*/}
            </button>
            // (this.props.handID=="PlayerHand")? this.props.cardObj.imgSource : require("../resources/back.png")
        );
    }

    cardHandleClick() {
        // this.props.logic.pickCard(this.props.cardObj);
        // this.props.logic.updateUI();
        //todo:fetch to gameRoomServer to invoke pickCard
        if (this.props.logic.playerTurn == this.props.index) {

           

            //todo:fetch to gameRoomServer to invoke takeCardFromDeck
            fetch('/lobby/pickCard', {
                method: 'POST',
                body: JSON.stringify({index: this.props.index, card: this.props.cardObj}),
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) {
                        if(response.status === 402)
                        {
                            //need to set msg to error msg
                        }
                        console.log(response);
                    }
                    else {
                        if(this.props.cardObj.type == "Taki" || this.props.cardObj.type == "st" || this.props.cardObj.type == "cc" )
                        {
                            this.props.render();
                        }
                        console.log("Good");
                    }
                });

              

        }
    }
}

