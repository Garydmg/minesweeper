import React, { Component } from 'react';

export default class Cell extends Component {

    render() {
        const { onClick } = this.props;
        const { isMine, isRevealed, numNeighborMines} = this.props.cellContent;
        const icons = this.props.cellIcons;
        const rendered = isMine ? icons["exposedBomb"] : icons["blank"];

        // board status rendering logic
        const boardStatus = (isRevealed && numNeighborMines === 0) ? 
            icons["pressed"] : icons["bombs"][numNeighborMines];

        return (
            <div onClick={onClick}>
                <img className="tile" src={rendered} alt="bomb"></img>
                <img className="numNeighbors" src={boardStatus} alt="indicator"></img>
            </div>
        )
    }
}