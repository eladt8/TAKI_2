import React from 'react';

export default class QuitGame extends React.Component {
    handleClick  () {
        fetch('/lobby/quitAction', {method: 'POST', credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                }
                else {
                    this.props.quitGame(); 
                    console.log("error in take card from deck fetch");
                }
            })
        // this.props.logic.quitAction();
    };
    render() {
        return (
            <button id="quit" onClick={this.handleClick.bind(this)} >QuitGame</button>
        );

    }
};