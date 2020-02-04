import React, { Component } from 'react';

export default class Cell extends Component {

    render() {
        const { onClick, gameOver, icons} = this.props;
        const { isMine, isRevealed, numNeighborMines} = this.props.cellContent;

        // board status rendering logic
        let boardStatus = null;
        if (gameOver) {
            boardStatus = isMine ? icons["explodedBomb"] : 
                (numNeighborMines !== 0 ? icons["bombs"][numNeighborMines] : icons["pressed"]);
        }
        else {
            boardStatus = (isRevealed && numNeighborMines === 0) ? 
                icons["pressed"] : icons["bombs"][numNeighborMines];
        }
        // to double check the correctness
        // const rendered = isMine ? icons["exposedBomb"] : icons["blank"];

        return (
            <div onClick={onClick}>
                {/* <img className="tile" src={rendered} alt="bomb"></img> */}
                <img className="tile" src={boardStatus} alt="indicator"></img>
            </div>
        )
    }
}