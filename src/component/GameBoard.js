import React, { Component } from 'react';
import Cell from './Cell';

export default class Board extends Component {
    /**
     * props:
     * board
        - getNeighborMines(i, j)

       icons
        - blank
        - pressed
        - exposedBomb
        - explodedBomb
        - flag
        - bombs: [] 0-8
     */
 
    state = {
        board: this.props.board,
        icons: this.props.icons
    }

    revealNeighbors = (rowNum, colNum) => {
        const board = this.state.board;
        console.log(board);
        if (board.isRevealed(rowNum, colNum)) return;
        if (board.isMine(rowNum, colNum)) {
            alert("You step on a mine!");
            return;
        }
        this.setState({
            board: this.state.board.getNeighborMines(rowNum, colNum)
        });
        console.log(this.state.board);
    }

    renderRows = (data, icons) => {
        return data.map((item) => {
            const {rowNum, colNum} = item;
            return (
                <div className="cell" key={rowNum * data.length + colNum}>
                    <Cell 
                        cellContent={item} 
                        cellIcons={icons}
                        onClick={() => this.revealNeighbors(rowNum, colNum)}
                    />
                </div>
            )
        });
    }

    renderCells = (data, icons) => {
        return data.map((boardRow, index) => {
            return (
                <div key={index} className="board-row">
                    {
                        this.renderRows(boardRow, icons)
                    }
                </div>
            )
        })
    }
    
    render() {
        const { board, icons } = this.props;
        return (
            <div className="board">
                <div className="board-info">
                    {
                        this.renderCells(board.content, icons)
                    }
                </div>
            </div>
        );
    }
}