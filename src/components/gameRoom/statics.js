import React from 'react';
import QuitGame from "./QuitGame"

export default class Statics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      players:[],
        }
        this.createStaticsTable = this.createStaticsTable.bind(this);
    };

    componentDidMount() {
        this.createStaticsTable();
    }





    createStaticsTable() {
                  
            fetch('lobby/getStatics', {method: 'GET', credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        console.log(response);
                        return response.json();
                    }
                    else {
                        throw err("error in take card from deck fetch");
                       //console.log("error in take card from deck fetch");
                    }
                }).then(content => {
                    this.setState(() => ({players: content}));
                })
                .catch(err => {
                    console.log("ERROR: ",err.message);
                });
        
    }

    render() {
        return (
            <div>
            <table className="statics-Table" >
            <caption id ="statics-Table-header">STATICS</caption>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Index</th>
            <th>place</th>
            <th>number of turns</th>
            <th>Average turn time</th>
            <th>One card counter</th>
            
            </tr>

            {this.state.players.map(this.buildStaticsTable.bind(this))}
            </tbody>
           

        </table>
        <QuitGame quitGame={this.props.quitAction}/>
        </div>
        );

    }
    buildStaticsTable(player)
    {
        if (player) {
            return (
                <tr>
                    <td>{player.playerName}</td>
                    <td>{this.playerIndex(player.playerIndex)}</td>
                    <td>{player.place}</td>
                    <td>{player.turnCount}</td>
                    <td>{player.avgTimeForPlayer}</td>
                    <td>{player.oneCardPlayerCounter}</td>

                </tr>
            )
        }
    }

    playerIndex(index)
    {
        return parseInt(index) + 1;
    }
    
};


