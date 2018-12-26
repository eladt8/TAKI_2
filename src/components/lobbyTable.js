import React from 'react';

export default class LobbyTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.content,
            id: this.props.id,

        }
        ;
    }

    // componentDidMount() {
    // this.buildTable();//:todo
    // }

    render() {

        if (this.state.id == "gameRooms") {
            return (
                <div id="gameRooms-tables" className="lobby-tables">
                    <table className="lobby-tables">
                        <tbody>
                        <tr>
                            <th>Room name</th>
                            <th>Creator name</th>
                            <th>#player</th>
                            <th>#players in</th>
                            <th>Active</th>
                            <th>Delete game</th>
                            <th>Join Room</th>
                        </tr>
                        {this.props.content.map(this.buildGameRoomsTable.bind(this))}
                        </tbody>
                    </table>
                </div>
            )
        }

        else if (this.state.id == "players") {
            return (
                <div id="players-tables" className="lobby-tables">
                    <table className="lobby-tables">
                        <tbody>
                        <tr>
                            <th>player name</th>
                        </tr>
                        {this.props.content.map(this.buildPlayersTable.bind(this))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    buildPlayersTable(player) {//todo
        if(player) {
            return (
                <tr>
                    <td>{player.name}</td>
                </tr>
            )
        }
    }

    buildGameRoomsTable(room) {
        if (room) {
            return (
                <tr>
                    <td>{room.roomName}</td>
                    <td>{room.creator}</td>
                    <td>{room.numberOfPlayers}</td>
                    <td>{room.activePlayers}</td>
                    <td>{(room.isActive) ? "YES" : "NO"}</td>
                    <td>
                        <button id="delete-room" className="table_But"
                                onClick={() => this.props.handleDeleteGame(room.roomName)}>Delete Room
                        </button>
                    </td>
                    <td>
                        <button id="join-room" className="table_But"
                                onClick={() => this.props.handleJoinGame(room.roomName)}>Join
                        </button>
                    </td>
                </tr>
            )
        }
    }
}
