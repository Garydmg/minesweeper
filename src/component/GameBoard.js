import React, { Component } from 'react';
import Cell from './Cell';
import Board from '../Board';

export default class GameBoard extends Component {
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
    constructor(props) {
        super(props);
        const { board, icons } = this.props;
        this.state = {
            board,
            icons
        };
    }

    /**
     * Reveal number of mines around where we click
     */
    revealNeighbors = (rowNum, colNum) => {
        const { board } = this.state;
        if (board.isWinning()) {
            return;
        }
        if (board.isRevealed(rowNum, colNum)) return;
        if (board.isMine(rowNum, colNum)) {
            board.revealAll();
        }
        
        this.setState({
            board: this.state.board.getNeighborMines(rowNum, colNum)
        }, () => {
            console.log(board.gameOver);
        });  
    }

    /**
     * Change parameters: board size and number of mines
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            board: new Board(this.boardSize.value, this.numMines.value)
        });
    }

    /**
     * Render 2D board row by row
     */
    renderRows = (data, icons) => {
        const { board } = this.state;
        return data.map((item) => {
            const {rowNum, colNum} = item;
            return (
                <div className="cell" key={rowNum * data.length + colNum}>
                    <Cell 
                        cellContent={item} 
                        icons={icons}
                        onClick={() => this.revealNeighbors(rowNum, colNum)}
                        gameOver={board.gameOver}
                    />
                </div>
            )
        });
    }

    renderBoard = (data, icons) => {
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
        const { board, icons } = this.state;
        // happy face emoji
        let messageWin = board.isWinning() ? 
            <h2>Congrats! You win the game! {String.fromCodePoint(128512)}</h2> : <h2>{}</h2>
        // s*** face emoji
        let messageLose = board.gameOver ? 
            <h2>Game over! You just stepped on a bomb {String.fromCodePoint(128169)}</h2> : <h2>{}</h2>
        
        return (
            <div className="game-area">
                <div className="menu">
                    <h2>Step 1: Select your Settings</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Board Size
                            <input type="text" 
                                placeholder={"e.g. 10"}
                                ref={e => this.boardSize = e} 
                                name="size" 
                                className="input-box"
                            />
                        </label>
                        <label>
                            # of Mines
                            <input type="text" 
                                placeholder={"e.g. 20"}
                                ref={e => this.numMines = e} 
                                name="numMines" 
                                className="input-box"
                            />
                        </label>
                        <input className="button" type="submit" value="Start Game" />
                    </form>
                </div>
                <div>
                    <h2>Step 2: Start the Challenge</h2>
                    <p>Board size: {board.size}</p>
                    <p>
                        There are {board.numMines} mines contained in {board.numCellsUnrevealed()} unrevealed cells
                    </p>
                </div>
                <div className="message">
                    {messageWin}
                    {messageLose}
                </div>
                <div className="board-info">
                    {
                        this.renderBoard(board.content, icons)
                    }
                </div>
            </div>
        );
    }
}