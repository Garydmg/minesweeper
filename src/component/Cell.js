import React, { Component } from 'react';

export default class Cell extends Component {

    render() {
        const { isMine, numNeighborMines} = this.props.cellContent;
        const icons = this.props.cellIcons;
        const rendered = isMine ? icons["exposedBomb"] : icons["blank"];
        const number = numNeighborMines === -1 ? -1 : icons["bombs"][numNeighborMines];
        return (
            <div>
                <img className="tile" src={rendered} alt="bomb"></img>
                <img className="numNeighbors" src={number} alt="indicator"></img>
            </div>
        )
    }
}