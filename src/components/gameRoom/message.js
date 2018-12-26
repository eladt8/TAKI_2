import React from 'react';
import QuitGame from "./QuitGame"
// import QuitGame from "../QuitGame"

const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
    ':' +
    ('0' + sec % 60).slice(-2)

export default class MessageDiv extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            message: this.props.message,
            gameNumber: this.props.gameNumber,
            secElapsed: 0,
            // totalNumberOfTurns: this.props.message,
        }
    }
    updateClock () {
        if(this.props.active)
        this.setState({
            secElapsed:this.state.secElapsed+ 1});
    };
    componentDidMount () {
        this.timer =setInterval( () =>this.updateClock(),1000);
    };

    render() {
        return (//todo: call the function (logic) from here with react
            <div id="messageDiv">
                <span className="messageChanges" id="message">{this.props.message}</span>
                {/* <span className="messageStat">number of games:</span> */}
                {/* <span className="message" id="gameNumber">{this.props.logic.gameturn}}</span> */}
                <span className="message" id="stopWatch">{formattedSeconds(this.state.secElapsed)}</span>
                <span className="messageStat">total number of turns:</span>
                <span className="message" id="totalNumberOfTurns">{this.props.logic.turnCount}</span>
                <QuitGame logic={this.props.logic} quitGame={this.props.quitAction}/>
            </div>);
    }
};



