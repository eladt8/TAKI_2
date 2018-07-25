import React from 'react';

export default class Lobby extends React.Component {

    constructor(args) {
        super(...args);

        this.state = {
            playerArr: [],
            gameRoomsArr: [],

        }
        ;
    }
    componentDidMount() {
        this.getPlayersArr();
        this.getGameRoomsArr();
    }
    render() {
        return (
            <ScrollList className="Lobby-table">
                <a>Link 1</a>
                <a>Link 1</a>
                <a>Link 1</a>
                <a>Link 1</a>
                <a>Link 1</a>
                <a>Link 1</a>

            </ScrollList>
        )
    }


    getPlayersArr() {
        return fetch('/lobby', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
                // this.timeoutId = setTimeout(this.getPlayersArr, 200);
                return response.json();
            })
            .then(playerArr => {
                this.setState(()=>({playerArr}));
            })
            .catch(err => {throw err});
    }

    getGameRoomsArr() {

    }
}
