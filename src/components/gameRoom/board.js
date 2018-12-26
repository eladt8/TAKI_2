import React from 'react';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.deck,
            discardPile: this.props.discardPile,
            index: this.props.index,

        }
    };

 

    deckHandleClick() {
        if (this.props.logic.playerTurn == this.props.index) {//todo: make sure the === not a prob

            //todo:fetch to gameRoomServer to invoke takeCardFromDeck
            fetch('/lobby/takeCardFromDeck', {method: 'POST', credentials: 'include'})
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                    }
                    else {
                        console.log("error in take card from deck fetch");
                    }
                })
        }
    }

    render() {
        return (
            <div id="board">
                <button id="deck" onClick={this.deckHandleClick.bind(this)} disabled={this.props.disableDeck}><img
                    src={require("../resources/deck.png")}></img>
                </button>
                <ChangeColor index={this.props.index} logic={this.props.logic} isCC ={this.props.logic.isCC}/>
                <CloseTaki index={this.props.index} logic={this.props.logic} isTaki ={this.props.logic.isTaki}/>

                <DiscardPile cardsPile={this.props.discardPile}>
                </DiscardPile>


            </div>
        );

    }

};

class DiscardPile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsPile: this.props.cardsPile,
            // imgSrc:"./cc.png"
        };

    }

    render() {
        return (<span>
            <button id="discardPile"><img src={this.props.cardsPile[0].imgSource}></img></button>
            <button id="discardPileColor" style={{background: this.props.cardsPile[0].color}} ></button>
       </span> );
    }
}

class ChangeColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.isCC,
        };

    }

    render() {
        if(this.props.isCC)
        {   if (this.props.logic.playerTurn == this.props.index) 
            {
                return (
                    <span id="colorSpan">

                    <button className="pickColor" id="colorButton"
                            onClick={this.chooseColorHandleClick.bind(this)}>choose</button>

                    <select className="pickColor" id="CCP">
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    </select>
                    </span>
                );
            }
            else
                return(<h1/>);
        }        
        else
        return(<h1/>);
    }

    chooseColorHandleClick() {
        // this.props.logic.clickOnColorPikcker();
        // this.props.logic.updateUI();
        //todo:fetch to gameRoomServer to invoke clickOnColorPikcker
        if (this.props.logic.playerTurn == this.props.index) {

            //todo:fetch to gameRoomServer to invoke takeCardFromDeck
            fetch('/lobby/clickOnColorPikcker', {body: JSON.stringify({index:this.props.index,CCP:document.getElementById("CCP").value}), method: 'POST', credentials: 'include'})
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        this.setState(()=>({show:this.props.isCC}));
                    }
                    else {
                        console.log("error in take card from deck fetch");
                    }
                })
        }


    }
}

class CloseTaki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.isTaki,
        };

    }

    render() {
        if(this.props.isTaki)
        { 
                if (this.props.logic.playerTurn == this.props.index) 
                {
                return (
                    <button id="closeTaki"  onClick={this.closeTakiHandleClick.bind(this)}>Close Taki</button>
                       );
                }
                else
                    return(<h1/>);
        }
        else
        return(<h1/>);
    }

    closeTakiHandleClick() {
        // this.props.logic.closedTaki();
        // this.props.logic.updateUI();
        //todo:fetch to gameRoomServer to invoke closedTaki
        if (this.props.logic.playerTurn == this.props.index) {

            //todo:fetch to gameRoomServer to invoke takeCardFromDeck
            fetch('/lobby/closedTaki', {body: this.props.index, method: 'POST', credentials: 'include'})
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        this.setState(()=>({show:this.props.isTaki}));
                    }
                    else {
                        console.log("error in take card from deck fetch");
                    }
                })
        }

    }
}